import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css";
import ConversationItem from "@/types/conversationItem";
import ConversationType from "@/enums/conversationType";

const Answer = (answer: ConversationItem) => {
  return (
    answer.type === ConversationType.Answer && (
      <div className="react-markdown mt-7">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {answer.content}
        </Markdown>
      </div>
    )
  );
};

export default Answer;
