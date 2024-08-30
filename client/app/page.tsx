"use client";

import { socket } from "../socket";
import React, { useEffect } from "react";
import ChatForm from "@/components/ChatForm";
import { useSetAtom } from "jotai";
import { broadCastJson } from "@/state/atoms";

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
    <main className="flex min-h-screen items-center justify-center p-5">
      <ChatForm />
    </main>
  );
}
