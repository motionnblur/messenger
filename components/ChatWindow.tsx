import React from "react";
import SendBar from "./SendBar";
import ChatCanvas from "./ChatCanvas";

export default function ChatWindow() {
  return (
    <div className="w-full h-full bg-slate-300 rounded flex flex-col">
      <ChatCanvas />
      <SendBar />
    </div>
  );
}
