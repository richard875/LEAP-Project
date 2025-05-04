"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";
import "github-markdown-css";
import "highlight.js/styles/github-dark-dimmed.css";

const Answer = ({
  answer,
  isLast,
}: {
  answer: ConversationItem;
  isLast: boolean;
}) => {
  const { systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    answer.type === ConversationType.Answer && (
      <div className={`mt-5 ${isLast ? "mb-5" : ""}`}>
        <div className="w-fit h-fit pl-2.5 pr-2.5 pt-2 pb-2 rounded-full border border-stone-300 dark:border-stone-500 flex items-center justify-center gap-2.5 select-none">
          {systemTheme === "light" ? (
            <Image
              className="select-none"
              src="/logo-small-light.png"
              alt="LawConnect Logo"
              width={20}
              height={20}
              priority
            />
          ) : (
            <Image
              className="select-none"
              src="/logo-small-dark.png"
              alt="LawConnect Logo"
              width={20}
              height={20}
              priority
            />
          )}
          <p className="text-sm font-medium">LawConnect</p>
        </div>
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
