"use client";

import { textList } from "@/state/atoms";
import { useSetAtom } from "jotai";
import React, { useRef } from "react";
import { Send } from "react-feather";

export default function SendBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setText = useSetAtom(textList);

  return (
    <div className="bottom-0 w-full h-[15%] flex flex-row items-center justify-center p-1 gap-1">
      <div className="w-full h-full">
        <input
          type="text"
          className="w-full h-full bg-white rounded-lg text-slate-800 p-1"
          ref={inputRef}
        />
      </div>
      <div
        className="w-10 h-full rounded-full cursor-pointer bg-slate-50 flex items-center justify-center"
        onPointerUp={() => {
          var text: string = inputRef.current?.value!;
          setText((textList) => [...textList, text]);
        }}
      >
        <Send color="black" size={30} />
      </div>
    </div>
  );
}
