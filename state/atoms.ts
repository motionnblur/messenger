import { atom } from "jotai";

export const textList = atom<string[]>([]);
export const socketConnected = atom<boolean>();
export const broadCastText = atom<string>();
