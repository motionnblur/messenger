export interface memory {
  messageArr: IMessage[];
  factor: number;
  lastMessageArr: IMessage[];
}

export const memory: memory = {
  messageArr: [],
  factor: 1,
  lastMessageArr: [],
};
