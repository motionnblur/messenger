import React from "react";
import SendBar from "./SendBar";

export default function ChatWindow() {
  return (
    <div className="w-full h-full bg-slate-300 rounded flex flex-col">
      <div className="w-full h-full"></div>
      <SendBar />
    </div>
  );
}
