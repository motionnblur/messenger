"use client";

import { socket } from "../socket";
import React, { useState, useEffect } from "react";
import ChatForm from "@/components/ChatForm";
import { useSetAtom } from "jotai";
import { broadCastText, socketConnected } from "@/state/atoms";

export default function Home() {
  const setSocketConnected = useSetAtom(socketConnected);
  const setBroadcastText = useSetAtom(broadCastText);

  const onConnect = () => {
    console.log("connected");
  };
  const onDisconnect = () => {
    console.log("disconnected");
  };
  const onBroadcast = (data: any) => {
    setBroadcastText(data as string);
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
