"use client";

import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

import ConversationContext from "@/context/conversationContext";
import ConversationType from "@/enums/conversationType";

import Answer from "../chat/AnswerComp/Answer";
import AnswerSkeleton from "../chat/AnswerComp/AnswerSkeleton";
import Question from "../chat/QuestionComp/Question";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Conversation = () => {
  const context = useContext(ConversationContext);

  return (
    <main className="w-full flex-1 overflow-auto pl-5 pr-5">
      {context?.conversation.length === 0 && (
        <div className="w-full h-full flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
          <p className="text-2xl font-bold">Start a conversation below</p>
          <FontAwesomeIcon className="text-xl" icon={faWandMagicSparkles} />
        </div>
      )}
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
