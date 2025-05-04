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
  return (
    answer.type === ConversationType.Answer && (
      <div className={`mt-5 ${isLast ? "mb-5" : ""}`}>
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
