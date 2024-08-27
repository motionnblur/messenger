"use client";

import { socket } from "../socket";
import React, { useState, useEffect } from "react";
import ChatForm from "@/components/ChatForm";

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    /* function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    } */

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    /* socket.on("foo", onFooEvent); */

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      /* socket.off("foo", onFooEvent); */
    };
  }, []);

  console.log(isConnected);

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <ChatForm />
    </main>
  );
}
