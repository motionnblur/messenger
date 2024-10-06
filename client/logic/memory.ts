export interface memory {
  messageArr: IMessage[];
  factor: number;
  lastMessageArr: IMessage[];
  locked : boolean
}

export const memory: memory = {
  messageArr: [],
  factor: 1,
  lastMessageArr: [],
  locked: false
};
