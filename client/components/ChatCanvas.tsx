"use client";

import React, { useEffect } from "react";
import ChatLine from "./ChatLine";
import { useAtomValue, useSetAtom } from "jotai";
import { broadCastJson, messageList } from "@/state/atoms";

export default function ChatCanvas() {
  const messages = useAtomValue(messageList);
  const setMessage = useSetAtom(messageList);
  const useBroadCastJson = useAtomValue(broadCastJson);

  useEffect(() => {
    if (useBroadCastJson != null || useBroadCastJson != undefined) {
      setMessage((messages) => [...messages, useBroadCastJson]);
    }
  }, [useBroadCastJson]);

  return (
    <div className="w-full h-full p-2 overflow-auto">
      <div className="w-full h-full flex flex-col">
        {messages.map((message) => (
          <ChatLine text={message} />
        ))}
      </div>
    </div>
  );
}
