import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { mockAnswer } from "../page/mock";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css";

const Answer = () => {
  return (
    <div className="react-markdown">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {mockAnswer}
      </Markdown>
    </div>
  );
};

export default Answer;
