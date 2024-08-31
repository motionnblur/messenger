"use client";

import { useAtomValue } from "jotai";
import { socket } from "../socket";
import React, { useRef } from "react";
import { Send } from "react-feather";
import { userName } from "@/state/atoms";

export default function SendBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const useUserName = useAtomValue(userName);

  return (
    <div className="bottom-0 w-full h-14 flex flex-row items-center justify-center p-2 gap-1">
      <div className="w-full h-full rounded-lg">
        <input
          type="text"
          className="w-full h-full bg-slate-100 rounded-lg text-slate-800 p-2 shadow shadow-slate-500"
          ref={inputRef}
        />
      </div>
      <div
        className="w-10 h-full rounded-full cursor-pointer bg-slate-50 flex items-center justify-center"
        onPointerUp={() => {
          var text: string = inputRef.current?.value!;
          if (text === null || !text) return;
          socket.emit("message", {
            userName: useUserName,
            message: text,
          });
          inputRef.current!.value! = "";
        }}
      >
        <Send color="black" size={30} />
      </div>
    </div>
  );
}
