import React from "react";

var lastMessageArr: IMessage[] = [];

function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  // Check if lengths are different
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check each element
  for (let i = 0; i < arr1.length; i++) {
    // Use JSON.stringify for deep comparison of objects
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }

  return true;
}
export default function SessionLoader({
  uploadRef,
  factor,
  messageArr,
  setRender,
  render,
}: {
  uploadRef: React.RefObject<HTMLDivElement>;
  factor: number;
  messageArr: IMessage[];
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  render: boolean;
}) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-5 transform
  bg-teal-300 w-14 h-14 rounded-full cursor-pointer"
      ref={uploadRef}
      onClick={() => {
        fetch(process.env.NEXT_PUBLIC_PREVIOUS_MESSAGE! + "?factor=" + factor, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error");
            return res.json();
          })
          .then((data: IMessage[]) => {
            const temp: IMessage[] = data;
            if (arraysEqual(temp, lastMessageArr)) return;

            messageArr.unshift(...data);

            lastMessageArr = data;
            factor += 1;
            setRender(!render);
          });
      }}
    />
  );
}
