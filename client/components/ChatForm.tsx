import React, { useRef } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatForm() {
  return (
    <div className="w-60 h-96 bg-slate-100 mb-48 rounded-lg p-2 flex flex-col gap-2">
      <div className="w-full h-10 flex justify-center items-center p-2">
        <input
          type="text"
          className="w-full h-full text-slate-800 rounded-md"
        />
        <div className="w-5 h-full bg-slate-900 cursor-pointer" />
      </div>
      <div className="w-full h-full p-1 flex justify-center items-center">
        <ChatWindow />
      </div>
    </div>
  );
}
