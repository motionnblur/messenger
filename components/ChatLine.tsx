import React from "react";

export default function ChatLine({ text }: { text: string }) {
  return (
    <div className="w-full h-11 flex justify-center items-center p-1">
      <div className="w-full h-full bg-slate-200 rounded-lg p-1">
        <div className="w-full h-full text-slate-900 text-lg">{text}</div>
      </div>
    </div>
  );
}
