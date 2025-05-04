import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
        toast("⚠️  Error: Conversation not found. Please try again");
        return;
      }

      context?.setConversation((prev) => [...prev.slice(0, idx), newQuestion]);

      const response = await fetch(ApiRoute.Edit, {
        method: "PATCH",
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

  const handleDelete = async () => {
    // Check if the systen is currently loading
    if (context?.loading) return;

    // Delete everything after question.id inclusive from context?.conversation
    const idx = context?.conversation.findIndex(
      (item) => item.id === question.id
    );

    if (idx === undefined || idx === -1) {
      toast("⚠️  Error: Conversation not found. Please try again");
      return;
    }

    context?.setConversation((prev) => [...prev.slice(0, idx)]);

    const response = await fetch(ApiRoute.Delete, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...question }),
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
                      onClick={handleEdit}
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
                  <AlertDialog>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="brightness-95 text-sm"
                          />
                        </button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>

                    <TooltipContent className="bg-foreground text-background">
                      <p>Delete</p>
                    </TooltipContent>

                    <AlertDialogContent>
                      <AlertDialogHeader className="select-none">
                        <AlertDialogTitle>
                          Are you sure you want to delete this question?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this question and all of its responses.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer select-none">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer select-none"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
