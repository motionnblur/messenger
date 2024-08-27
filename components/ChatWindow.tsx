import React from "react";
import SendBar from "./SendBar";
import ChatCanvas from "./ChatCanvas";

export default function ChatWindow() {
  return (
    <div className="w-full h-full rounded flex flex-col">
      <ChatCanvas />
      <SendBar />
    </div>
  );
}
