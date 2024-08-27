import React from "react";
import { Send } from "react-feather";

export default function SendBar() {
  return (
    <div className="bottom-0 w-full h-[15%] flex flex-row items-center justify-center p-1 gap-1">
      <input
        type="text"
        className="w-full h-full bg-white rounded-lg text-slate-800"
      />
      <div className="w-10 h-full rounded-full cursor-pointer bg-slate-50 flex items-center justify-center">
        <Send color="black" size={30} />
      </div>
    </div>
  );
}
