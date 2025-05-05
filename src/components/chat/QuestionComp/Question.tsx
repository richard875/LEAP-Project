"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import ConversationContext from "@/context/conversationContext";
import ConversationType from "@/enums/conversationType";
import deleteChat from "@/lib/functions/deleteChat";
import editChat from "@/lib/functions/editChat";
import ConversationItem from "@/types/conversationItem";

import QuestionButtons from "./QuestionButtons";

const ERR_MSG = "Something went wrong. Please try again";
const NOT_FOUND = "⚠️  Error: Conversation not found. Please try again";

const Question = ({
  question,
  isFirst,
}: {
  question: ConversationItem;
  isFirst: boolean;
}) => {
  const context = useContext(ConversationContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editing, setEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question.content);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
    if (editing && textareaRef.current) textareaRef.current.focus();
  }, [questionText, editing]);

  const handleEdit = async () => {
    setEditing(!editing);
    // Check for empty text
    if (questionText.trim() === "") {
      setQuestionText(question.content);
      return;
    }
    // Check if the systen is currently loading
    if (context?.loading) return;

    // Continue if all checks pass
    if (editing) {
      context?.setLoading(true);
      const newQuestion: ConversationItem = {
        ...question,
        content: questionText,
      };
      // Delete everything after newQuestion.id from context?.conversation
      const idx = context?.conversation.findIndex(
        (item) => item.id === newQuestion.id
      );

      if (idx === undefined || idx === -1) {
        setEditing(false);
        toast(NOT_FOUND);
        return;
      }

      context?.setConversation((prev) => [...prev.slice(0, idx), newQuestion]);

      const res = await editChat(newQuestion);
      if ("status" in res && res.status !== 200) {
        toast(`⚠️  Error: ${res.error ? res.error : ERR_MSG}`);
        return;
      }

      context?.setLoading(false);
      context?.setConversation((prev) => [...prev, res as ConversationItem]);
    }
  };

  const handleDelete = async () => {
    // Check if the systen is currently loading
    if (context?.loading) return;

    // Delete everything after question.id inclusive from context?.conversation
    const idx = context?.conversation.findIndex(
      (item) => item.id === question.id
    );

    if (idx === undefined || idx === -1) {
      toast(NOT_FOUND);
      return;
    }

    context?.setConversation((prev) => [...prev.slice(0, idx)]);

    const res = await deleteChat(question);
    if ("status" in res && res.status !== 200) {
      toast(`⚠️  Error: ${res.error ? res.error : ERR_MSG}`);
      return;
    }
  };

  return (
    question.type === ConversationType.Question && (
      <>
        <div
          className={`w-full flex justify-end ${isFirst ? "mt-20" : "mt-12"}`}
        >
          <div
            className={`max-w-[450px] flex flex-col items-end ${
              editing ? "w-full" : ""
            }`}
          >
            {editing ? (
              <textarea
                ref={textareaRef}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="resize-none focus:outline-none w-full bg-neutral-100 dark:bg-neutral-700 rounded-3xl pl-5 pr-5 pt-2.5 pb-2.5 leading-6 font-medium"
              />
            ) : (
              <p className="bg-neutral-100 dark:bg-neutral-700 rounded-3xl pl-5 pr-5 pt-2.5 pb-2.5 leading-6 font-medium">
                {questionText}
              </p>
            )}
            <QuestionButtons
              editing={editing}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <Toaster theme="system" />
      </>
    )
  );
};

export default Question;
