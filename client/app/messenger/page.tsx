"use client";

import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { broadCastJson } from "@/state/atoms";
import { socket } from "@/socket";
import Messenger from "@/components/Messenger";

export default function Home() {
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

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("broadcast", onBroadcast);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("broadcast", onBroadcast);
    };
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center absolute left-0 top-0">
      <Messenger />
    </main>
  );
}
