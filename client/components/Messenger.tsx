import React from "react";
import ChatWindow from "./ChatWindow";

export default function Messenger() {
  return (
    <div className="w-full h-full bg-slate-50 flex flex-col absolute left-0 top-0">
      <div className="w-full h-[5%] bg-slate-200 drop-shadow-md flex justify-center items-center z-10">
        <div className="w-3/5 h-1/6 text-gray-900 flex justify-center items-center">
          Can
        </div>
      </div>
      <div className="w-full h-[95%] absolute z-0 bottom-0">
        <ChatWindow />
      </div>
    </div>
  );
}
