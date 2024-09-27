"use client";

import React, { useEffect } from "react";
import ChatLine from "./ChatLine";
import { useAtomValue } from "jotai";
import { broadCastJson, sessionMessage } from "@/state/atoms";

var messageArr: IMessage[] = [];

export default function ChatCanvas() {
  const useSessionMessage = useAtomValue(sessionMessage);
  const useBroadCastJson = useAtomValue(broadCastJson);

  const canvasRef = React.useRef<HTMLDivElement>(null);
  const uploadRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight;
    }
  }, [useSessionMessage, useBroadCastJson]);

  if (useBroadCastJson !== undefined && useBroadCastJson !== null) {
    messageArr.push(useBroadCastJson!);
  } else if (useSessionMessage !== undefined && useSessionMessage !== null) {
    if (useSessionMessage) {
      useSessionMessage.forEach((obj) => {
        messageArr.push({
          userName: obj.userName,
          message: obj.message,
        });
      });
    }
  }

  return (
    <div
      className="w-full h-full p-2 overflow-auto"
      ref={canvasRef}
      onScroll={() => {
        if (messageArr.length < 50) return;

        if (canvasRef!.current!.scrollTop === 0) {
          uploadRef!.current!.style.display = "block";
        } else {
          uploadRef!.current!.style.display = "none";
        }
      }}
    >
      <div className="w-full h-full flex flex-col">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-5 transform
        bg-teal-300 w-14 h-14 rounded-full cursor-pointer"
          ref={uploadRef}
          onClick={() => {
            fetch(process.env.NEXT_PUBLIC_PREVIOUS_MESSAGE! + "?factor=" + 1, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (!res.ok) throw new Error("Error");
                return res.json();
              })
              .then((d: any) => {
                console.log(d);
              });
          }}
        />
        {messageArr.map((m: IMessage) => (
          // eslint-disable-next-line react/jsx-key
          <ChatLine sessionUserName={m.userName} text={m.message} />
        ))}
      </div>
    </div>
  );
}
