import Conversation from "@/components/page/Conversation";
import ChatBox from "@/components/chat/ChatBox";
import Misc from "@/components/page/Misc";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Conversation />
      <ChatBox />
      <Misc />
    </div>
  );
}
