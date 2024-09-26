import { userName } from "@/state/atoms";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

export default function ChatLine({
  sessionUserName,
  text,
}: {
  sessionUserName: String;
  text: String;
}) {
  const useUserName = useAtomValue(userName);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`w-fit h-fit justify-center items-center p-1 ${
        useUserName !== sessionUserName && "mr-0 ml-auto"
      } ${
        fadeIn ? "transition-opacity duration-500 opacity-100" : "opacity-0"
      }`}
    >
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
          {sessionUserName === useUserName
            ? text
            : sessionUserName + ": " + text}
        </div>
      </div>
    </div>
  );
}
