"use client";

import { textAtom } from "@/state/atoms";
import { useSetAtom } from "jotai";
import React, { useRef } from "react";
import { Send } from "react-feather";

export default function SendBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setText = useSetAtom(textAtom);

  return (
    <div className="bottom-0 w-full h-[15%] flex flex-row items-center justify-center p-1 gap-1">
      <input
        type="text"
        className="w-full h-full bg-white rounded-lg text-slate-800"
        ref={inputRef}
      />
      <div
        className="w-10 h-full rounded-full cursor-pointer bg-slate-50 flex items-center justify-center"
        onPointerUp={() => {
          setText(inputRef.current?.value!);
        }}
      >
        <Send color="black" size={30} />
      </div>
    </div>
  );
}
