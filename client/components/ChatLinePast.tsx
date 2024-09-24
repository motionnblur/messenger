import React from "react";

export default function ChatLinePast({ text }: { text: String }) {
  return (
    <div className="w-full h-fit justify-center items-center p-1">
      <div
        className={`w-full h-fit flex-wrap rounded-lg p-1 bg-slate-900`}
        style={{
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        <div className={`text-lg font-medium`}>{text}</div>
      </div>
    </div>
  );
}
