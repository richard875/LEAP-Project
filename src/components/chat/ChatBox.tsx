"use client";

import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Toaster } from "@/components/ui/sonner";
import ConversationContext from "@/context/conversationContext";
import ApiRoute from "@/enums/apiRoute";
import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";

const ChatBox = () => {
  const { systemTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const context = useContext(ConversationContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && textareaRef.current) textareaRef.current.focus();
  }, [mounted]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setDisabled(message.trim() === "");
  }, [message]);

  if (!mounted) return null;

  const handleSubmit = async () => {
    if (disabled || context?.loading) return; // Prevent submission if disabled
    context?.setLoading(true);

    const question: ConversationItem = {
      id: uuidv4(),
      date: new Date(),
      content: message,
      type: ConversationType.Question,
    };

    setMessage("");
    context?.setConversation((prev) => [...prev, question]);

    const newQuestionId = questionId || uuidv4();
    if (!questionId) setQuestionId(newQuestionId);
    const response = await fetch(ApiRoute.Conversations, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...question, questionId: newQuestionId }),
    });

    if (!response.ok) {
      toast(
        `⚠️  Error: ${
          response.statusText
            ? response.statusText
            : "Something went wrong. Please try again"
        }`
      );
      return;
    }

    const responseData: ConversationItem = await response.json();
    context?.setLoading(false);
    context?.setConversation((prev) => [...prev, responseData]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !context?.loading) handleSubmit();
    }
  };

  return (
    <>
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
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                className="w-full max-h-[250px] resize-none focus:outline-none pl-3 pr-3"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              onClick={handleSubmit}
              className={`text-2xl text-primary dark:text-white transition ${
                disabled || context?.loading
                  ? "brightness-65"
                  : "hover:brightness-80 cursor-pointer"
              }`}
            />
          </div>
          <p className="select-none text-center text-xs text-neutral-700 dark:text-neutral-300 pt-2 pb-2 pl-10 pr-10">
            Our service provides general legal information, not legal advice.
            Consult a lawyer for personalized assistance.
          </p>
        </div>
      </footer>
      <Toaster theme="system" />
    </>
  );
};

export default ChatBox;
