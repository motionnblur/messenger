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
      className={`w-fit h-fit flex flex-col m-1 ${
        useUserName !== sessionUserName && "mr-0 ml-auto"
      } ${
        fadeIn ? "transition-opacity duration-500 opacity-100" : "opacity-0"
      }  ${useUserName === sessionUserName && "bg-blue-400"} rounded-lg p-1`}
    >
      <div
        className={`w-fit max-w-96 h-full justify-center items-center rounded-lg ${
          useUserName !== sessionUserName && "bg-slate-200 p-1 mr-1"
        }`}
      >
        <div
          className={`w-full h-fit flex-wrap ${
            useUserName === sessionUserName ? "text-white" : "text-black"
          } text-lg font-medium`}
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {text}
        </div>
      </div>
      {useUserName !== sessionUserName && (
        <div
          className="mr-0 ml-auto flex-wrap text-slate-800 text-xs"
          style={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {sessionUserName}
        </div>
      )}
    </div>
  );
}
