"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

import ConversationContext from "@/context/conversationContext";
import ConversationType from "@/enums/conversationType";

import Answer from "../chat/AnswerComp/Answer";
import AnswerSkeleton from "../chat/AnswerComp/AnswerSkeleton";
import Question from "../chat/Question";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Conversation = () => {
  const context = useContext(ConversationContext);

  return (
    <main className="w-full flex-1 overflow-auto pl-5 pr-5">
      <div className="max-w-[800px] m-auto">
        <AnimatePresence initial={false}>
          {context?.conversation.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {item.type === ConversationType.Question ? (
                <>
                  <Question question={item} isFirst={index === 0} />
                  {index + 1 === context.conversation.length &&
                    context?.loading && <AnswerSkeleton />}
                </>
              ) : (
                <Answer
                  answer={item}
                  isLast={index === context.conversation.length - 1}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Conversation;
