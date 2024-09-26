"use client";

import React, { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { broadCastJson, sessionMessage, userName } from "@/state/atoms";
import { socket } from "@/socket";
import Messenger from "@/components/Messenger";
import { useRouter } from "next/navigation";

export default function Home() {
  const useUserName = useAtomValue(userName);
  const setSessionMessage = useSetAtom(sessionMessage);
  const setBroadcastJson = useSetAtom(broadCastJson);

  const { push } = useRouter();

  const audio = new Audio("notification.mp3");

  const onConnect = () => {
    console.log("connected");
  };
  const onDisconnect = () => {
    console.log("disconnected");
  };
  const onBroadcast = (data: IMessage) => {
    setBroadcastJson(data);
    if (useUserName !== data.userName) {
      audio.play();
    }
  };
  const onError = (e: any) => {
    console.log(e.errorMessage);
    if (e.timeout === true) {
      alert(e.errorMessage);
      push("/login");
    }
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SESSION_IP!)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data: ISession[]) => {
        if (data !== undefined && data !== null) {
          setSessionMessage(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("broadcast", onBroadcast);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("broadcast", onBroadcast);
      socket.off("error", onError);
    };
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center absolute left-0 top-0">
      <Messenger />
    </main>
  );
}
