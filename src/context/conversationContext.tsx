"use client";

import { createContext, useState, ReactNode } from "react";
import ConversationItem from "@/types/conversationItem";

type ConversationContextType = {
  conversation: ConversationItem[];
  setConversation: React.Dispatch<React.SetStateAction<ConversationItem[]>>;
};

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const contextValue = { conversation, setConversation };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
