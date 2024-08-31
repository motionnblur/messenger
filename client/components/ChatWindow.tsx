import React from "react";
import SendBar from "./SendBar";
import ChatCanvas from "./ChatCanvas";

export default function ChatWindow() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <ChatCanvas />
      <SendBar />
    </div>
  );
}
