export interface IMessage {
  id: string;
  fromId: string;
  toId: string;
  text: string;
  files: string[];
  time: string;
  unread: boolean;
  fromName?: string;
  toName?: string;
}

export interface IMember {
  id: string;
  name: string;
  avatar: string;
  type: string; //'ADMIN' | 'CLIENT' | 'SUPPLIER' | 'SUB_SUPPLIER';
}

export interface IConversation {
  id: string;
  members: IMember[];
  // messages: message[];
  name: string;
}

export interface IConversationSummary {
  id: string;
  name: string;
  members: IMember[];
  // lastMessage: message;
  lastMessageTime: string;
  unread: boolean;
  unreadCount: number;
  conversation: IConversation;
  autoScroll: boolean;
  isLoading: boolean;
  noMoreMessages: boolean;
  isLoadedAtLeastOnce: boolean;
}

export interface formList {
  id: string;
  type?: string; //'Screen' | 'section' | 'Header' | 'container' | 'textInput' | 'Form' as
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  children?: formList[];
}
