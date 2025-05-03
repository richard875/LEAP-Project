"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatBox = () => {
  const { systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  if (!mounted) return null;

  return (
    <footer className="w-full pl-5 pr-5">
      <div className="max-w-[800px] m-auto flex flex-col items-center justify-around">
        <div className="w-full min-h-14 pl-4 pr-4 bg-neutral-50 dark:bg-neutral-700 border border-stone-300 dark:border-stone-500 rounded-4xl shadow-xs flex items-center justify-between">
          <div className="w-full flex items-center pt-2 pb-2">
            {systemTheme === "light" ? (
              <Image
                className="select-none"
                src="/logo-small-light.png"
                alt="LawConnect Logo"
                width={24}
                height={24}
                priority
              />
            ) : (
              <Image
                className="select-none"
                src="/logo-small-dark.png"
                alt="LawConnect Logo"
                width={24}
                height={24}
                priority
              />
            )}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question..."
              rows={1}
              className="w-full resize-none focus:outline-none pl-3 pr-3"
            />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="text-2xl text-primary dark:text-white cursor-pointer hover:brightness-80 transition"
          />
        </div>
        <p className="select-none text-center text-xs text-neutral-700 dark:text-neutral-300 pt-2 pb-2 pl-10 pr-10">
          Our service provides general legal information, not legal advice.
          Consult a lawyer for personalized assistance.
        </p>
      </div>
    </footer>
  );
};

export default ChatBox;
