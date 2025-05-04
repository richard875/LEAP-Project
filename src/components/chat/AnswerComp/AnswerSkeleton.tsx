import { Skeleton } from "@/components/ui/skeleton";

import AnswerPill from "./AnswerPill";

const AnswerSkeleton = () => {
  return (
    <div className="mt-5 mb-5">
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
