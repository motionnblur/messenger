import React, { useRef } from "react";
import ChatWindow from "./ChatWindow";
import { useSetAtom } from "jotai";
import { userName } from "@/state/atoms";

export default function ChatForm() {
  const setUserName = useSetAtom(userName);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-60 h-96 bg-slate-100 mb-48 rounded-lg p-2 flex flex-col gap-2">
      <div className="w-full h-10 flex justify-center items-center p-2">
        <input
          type="text"
          className="w-full h-full text-slate-800 rounded-md"
          ref={nameRef}
        />
        <div
          className="w-5 h-full bg-slate-900 cursor-pointer"
          onMouseUp={() => {
            setUserName(nameRef.current?.value);
          }}
        />
      </div>
      <div className="w-full h-full p-1 flex justify-center items-center">
        <ChatWindow />
      </div>
    </div>
  );
}
