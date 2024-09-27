"use client";

import React, { useEffect } from "react";
import ChatLine from "./ChatLine";
import { useAtomValue } from "jotai";
import { broadCastJson, sessionMessage } from "@/state/atoms";
import SessionLoader from "./SessionLoader";

var messageArr: IMessage[] = [];
var factor: number = 1;

export default function ChatCanvas() {
  const useSessionMessage = useAtomValue(sessionMessage);
  const useBroadCastJson = useAtomValue(broadCastJson);

  const [render, setRender] = React.useState(false);

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
        <SessionLoader
          uploadRef={uploadRef}
          factor={factor}
          messageArr={messageArr}
          setRender={setRender}
          render={render}
        />
        {messageArr.map((m: IMessage) => (
          // eslint-disable-next-line react/jsx-key
          <ChatLine sessionUserName={m.userName} text={m.message} />
        ))}
      </div>
    </div>
  );
}
