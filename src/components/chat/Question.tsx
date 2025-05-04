import {
  faCheck,
  faRotate,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";

const Question = ({
  question,
  isFirst,
}: {
  question: ConversationItem;
  isFirst: boolean;
}) => {
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

  return (
    question.type === ConversationType.Question && (
      <div className={`w-full flex justify-end ${isFirst ? "mt-20" : "mt-8"}`}>
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
            <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
              <FontAwesomeIcon
                icon={faRotate}
                className="brightness-95 text-sm"
              />
            </div>
            <div
              onClick={() => setEditing(!editing)}
              className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <FontAwesomeIcon
                icon={editing ? faCheck : faPenToSquare}
                className="brightness-95 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Question;
