"use client";

import React from "react";
import ChatLine from "./ChatLine";
import { useAtomValue } from "jotai";
import { textList } from "@/state/atoms";

export default function ChatCanvas() {
  const text = useAtomValue(textList);
  console.log(text);
  return (
    <div className="w-full h-full p-1">
      <div className="w-full h-full flex flex-col bg-white rounded-sm">
        <ChatLine />
      </div>
    </div>
  );
}
