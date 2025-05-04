"use client";

import { useContext } from "react";

import ConversationContext from "@/context/conversationContext";
import ConversationType from "@/enums/conversationType";

import Answer from "../chat/Answer";
import Question from "../chat/Question";

const Conversation = () => {
  const context = useContext(ConversationContext);

  return (
    <main className="w-full flex-1 overflow-auto pl-5 pr-5">
      <div className="max-w-[800px] m-auto">
        {context?.conversation.map((item, index) =>
          item.type === ConversationType.Question ? (
            <Question key={item.id} question={item} isFirst={index === 0} />
          ) : (
            <Answer key={item.id} answer={item} />
          )
        )}
      </div>
    </main>
  );
};

export default Conversation;
