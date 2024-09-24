import { userName } from "@/state/atoms";
import { useAtomValue } from "jotai";
import React from "react";

export default function ChatLine({
  sessionUserName,
  text,
}: {
  sessionUserName: String;
  text: String;
}) {
  const useUserName = useAtomValue(userName);

  return (
    <div className="w-full h-fit justify-center items-center p-1">
      <div
        className={`w-full h-fit flex-wrap ${
          useUserName === sessionUserName ? "bg-blue-400" : "bg-slate-300"
        } rounded-lg p-1`}
        style={{
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        <div
          className={`${
            useUserName === sessionUserName ? "text-white" : "text-black"
          } text-lg font-medium`}
        >
          {sessionUserName + ": " + text}
        </div>
      </div>
    </div>
  );
}
