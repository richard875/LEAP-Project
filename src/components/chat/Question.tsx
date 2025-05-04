import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConversationContext from "@/context/conversationContext";
import ApiRoute from "@/enums/apiRoute";
import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";

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

  const handleSubmit = async () => {
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
      // delete everything after newQuestion.id from context?.conversation
      const idx = context?.conversation.findIndex(
        (item) => item.id === newQuestion.id
      );

      if (idx === undefined || idx === -1) {
        setEditing(false);
        toast("⚠️  Error: Conversation not found. Please try again");
        return;
      }

      context?.setConversation((prev) => [...prev.slice(0, idx), newQuestion]);

      const response = await fetch(ApiRoute.Edit, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newQuestion }),
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
            <div className="mt-1 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={handleSubmit}
                      className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={editing ? faCheck : faPenToSquare}
                        className="brightness-95 text-sm"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground text-background">
                    <p>{editing ? "Done" : "Edit"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="brightness-95 text-sm"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground text-background">
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <Toaster theme="system" />
      </>
    )
  );
};

export default Question;
