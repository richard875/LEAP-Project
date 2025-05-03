import Answer from "../chat/Answer";
import Question from "../chat/Question";

const Conversation = () => {
  return (
    <main className="w-full flex-1 overflow-auto">
      <div className="max-w-[800px] m-auto">
        <Question />
        <Answer />
      </div>
    </main>
  );
};

export default Conversation;
