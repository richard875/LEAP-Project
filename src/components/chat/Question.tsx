import { faPenToSquare, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ConversationType from "@/enums/conversationType";
import ConversationItem from "@/types/conversationItem";

const Question = (question: ConversationItem) => {
  return (
    question.type === ConversationType.Question && (
      <div className="w-full flex justify-end mt-20">
        <div className="max-w-[450px] flex flex-col items-end">
          <p className="bg-neutral-100 dark:bg-neutral-700 rounded-3xl pl-5 pr-5 pt-2.5 pb-2.5 leading-6 font-medium">
            {question.content}
          </p>
          <div className="mt-1 flex gap-1">
            <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
              <FontAwesomeIcon
                icon={faRotate}
                className="brightness-95 text-sm"
              />
            </div>
            <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
              <FontAwesomeIcon
                icon={faPenToSquare}
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
