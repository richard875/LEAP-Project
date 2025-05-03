import { mockQuestion } from "../page/mock";

const Question = () => {
  return (
    <div className="w-full flex justify-end mt-20">
      <div className="max-w-[450px] bg-neutral-100 dark:bg-neutral-700 rounded-3xl pl-5 pr-5 pt-2.5 pb-2.5 leading-6 font-medium">
        {mockQuestion}
      </div>
    </div>
  );
};

export default Question;
