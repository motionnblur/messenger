"use client";

import React, { useEffect } from "react";
import ChatLine from "./ChatLine";
import { useAtomValue, useSetAtom } from "jotai";
import { broadCastText, textList } from "@/state/atoms";

export default function ChatCanvas() {
  const text = useAtomValue(textList);
  const setText = useSetAtom(textList);
  const useBroadCastText = useAtomValue(broadCastText);

  useEffect(() => {
    console.log(useBroadCastText);
    if (useBroadCastText != null || useBroadCastText != undefined) {
      console.log(useBroadCastText);
      setText((textList) => [...textList, useBroadCastText!]);
    }
  }, [useBroadCastText]);

  return (
    <div className="w-full h-full p-1">
      <div className="w-full h-full flex flex-col bg-white rounded-sm">
        {text.map((textString) => (
          <ChatLine text={textString} />
        ))}
      </div>
    </div>
  );
}
