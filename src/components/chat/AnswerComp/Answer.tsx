import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";
import "github-markdown-css";
import "highlight.js/styles/github-dark-dimmed.css";

import AnswerPill from "./AnswerPill";

const Answer = ({
  answer,
  isLast,
}: {
  answer: ConversationItem;
  isLast: boolean;
}) => {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    answer.type === ConversationType.Answer && (
      <div ref={answerRef} className={`mt-5 ${isLast ? "mb-3 xl:mb-8" : ""}`}>
        <AnswerPill />
        <article className="react-markdown markdown-body !bg-transparent">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {answer.content}
          </Markdown>
        </article>
      </div>
    )
  );
};

export default Answer;
