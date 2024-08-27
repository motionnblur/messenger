import React from "react";
import ChatLine from "./ChatLine";

export default function ChatCanvas() {
  return (
    <div className="w-full h-full p-1">
      <div className="w-full h-full flex flex-col bg-white rounded-sm">
        <ChatLine />
      </div>
    </div>
  );
}
