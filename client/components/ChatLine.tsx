import { userName } from "@/state/atoms";
import { useAtomValue } from "jotai";
import React from "react";

export default function ChatLine({ text }: { text: IMessage }) {
  const useUserName = useAtomValue(userName);

  return (
    <div className="w-full h-11 flex justify-center items-center p-1">
      <div
        className={`w-full h-full ${
          useUserName === text.userName ? "bg-blue-400" : "bg-slate-300"
        } rounded-lg p-1`}
      >
        <div
          className={`w-full h-full ${
            useUserName === text.userName ? "text-white" : "text-black"
          } text-lg font-medium`}
        >
          {text.userName + ": " + text.message}
        </div>
      </div>
    </div>
  );
}
