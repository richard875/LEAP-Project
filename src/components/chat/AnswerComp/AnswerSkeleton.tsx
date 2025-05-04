import { useContext, useRef, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import ConversationContext from "@/context/conversationContext";

import AnswerPill from "./AnswerPill";

const AnswerSkeleton = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const context = useContext(ConversationContext);

  useEffect(() => {
    if (context?.loading && bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [context?.loading]);

  return (
    <div ref={bottomRef} className="mt-5 mb-5">
      <AnswerPill />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-[300px]" />
        <Skeleton className="h-4 max-w-[450px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default AnswerSkeleton;
