"use client";

import { createContext, useState, ReactNode } from "react";

import ConversationItem from "@/types/conversationItem";

type ConversationContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  conversation: ConversationItem[];
  setConversation: React.Dispatch<React.SetStateAction<ConversationItem[]>>;
};

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const contextValue = { conversation, setConversation, loading, setLoading };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
