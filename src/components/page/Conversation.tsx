"use client";

import { useContext } from "react";
import Answer from "../chat/Answer";
import Question from "../chat/Question";
import ConversationType from "@/enums/conversationType";
import ConversationContext from "@/context/conversationContext";

const Conversation = () => {
  const context = useContext(ConversationContext);

  return (
    <main className="w-full flex-1 overflow-auto">
      <div className="max-w-[800px] m-auto">
        {context?.conversation.map((item) =>
          item.type === ConversationType.Question ? (
            <Question key={item.id} {...item} />
          ) : (
            <Answer key={item.id} {...item} />
          )
        )}
      </div>
    </main>
  );
};

export default Conversation;
