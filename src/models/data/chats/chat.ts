interface Message {
  id: number;
}

interface ChatTypes {
  messages: Message[];
}

export type {ChatTypes, Message};
