import React from "react";

export default function ChatForm() {
  return (
    <div className="w-60 h-96 bg-slate-100 mb-48 rounded-lg p-2 flex flex-col gap-2">
      <div className="w-full h-10 flex justify-center items-center p-1">
        <input type="text" className="w-full h-full text-slate-800"></input>
      </div>
      <div className="w-full h-full p-1 flex justify-center items-center">
        <div className="w-full h-full bg-slate-300 rounded"></div>
      </div>
    </div>
  );
}
