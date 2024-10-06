import { arraysEqual } from "@/logic/fPublic";
import { memory } from "@/logic/memory";
import React from "react";
import { ArrowUp } from "react-feather";

export default function SessionLoader({
  uploadRef,
  messageArr,
  setRender,
  render,
}: {
  uploadRef: React.RefObject<HTMLDivElement>;
  messageArr: IMessage[];
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  render: boolean;
}) {
  return (
    <ArrowUp
      size={30}
      className="absolute left-1/2 -translate-x-1/2 top-5 transform
  bg-slate-900 w-14 h-14 rounded-full cursor-pointer"
      ref={uploadRef}
      onClick={() => {
        fetch(
          process.env.NEXT_PUBLIC_PREVIOUS_MESSAGE! +
            "?factor=" +
            memory.factor,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.status === 423) throw new Error("Locked");
            if (!res.ok) throw new Error("Error");
            return res.json();
          })
          .then((data: IMessage[]) => {
            const temp: IMessage[] = data;
            if (arraysEqual(temp, memory.lastMessageArr)) return;

            messageArr.unshift(...data);

            memory.lastMessageArr = data;
            memory.factor += 1;
            setRender(!render);
          })
          .catch((err) => {
            if (err.message === "Locked") {
              uploadRef!.current!.style.display = "none";
              memory.locked = true;
            }
          });
      }}
    />
  );
}
