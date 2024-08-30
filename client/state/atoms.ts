import { atom } from "jotai";

export const messageList = atom<IMessage[]>([]);
export const socketConnected = atom<boolean>();
export const userName = atom<string>();
export const broadCastJson = atom<IMessage>();
