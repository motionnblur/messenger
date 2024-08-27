import React from "react";

export default function SendBar() {
  return (
    <div className="bottom-0 w-full h-1/6 flex flex-row items-center justify-center p-2 gap-1">
      <input
        type="text"
        className="w-full h-full bg-white rounded-lg text-slate-800"
      />
      <div className="w-10 h-full bg-black rounded-full cursor-pointer"></div>
    </div>
  );
}
