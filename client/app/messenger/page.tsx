"use client";

import React, { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { broadCastJson, messageList, userName } from "@/state/atoms";
import { socket } from "@/socket";
import Messenger from "@/components/Messenger";
import { useRouter } from "next/navigation";
import macro from "styled-jsx/macro";

export default function Home() {
  const useUserName = useAtomValue(userName);
  const setMessage = useSetAtom(messageList);

  const { push } = useRouter();

  const setBroadcastJson = useSetAtom(broadCastJson);

  const onConnect = () => {
    console.log("connected");
  };
  const onDisconnect = () => {
    console.log("disconnected");
  };
  const onBroadcast = (data: IMessage) => {
    setBroadcastJson(data);
  };
  const onError = (e: any) => {
    console.log(e.errorMessage);
    if (e.timeout === true) {
      alert(e.errorMessage);
      push("/login");
    }
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SESSION_IP! + "?userName" + "=" + useUserName)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        data.forEach((m: string) => {
          const messageObj: IMessage = {
            userName: useUserName!,
            message: m,
          };
          setMessage((messages) => [...messages, messageObj]);
        });
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
