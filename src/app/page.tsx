import Conversation from "@/components/page/Conversation";
import ChatBox from "@/components/chat/ChatBox";
import Misc from "@/components/page/Misc";
import { ConversationProvider } from "@/context/conversationContext";

export default function Home() {
  return (
    <ConversationProvider>
      <div className="flex flex-col h-screen">
        <Conversation />
        <ChatBox />
        <Misc />
      </div>
    </ConversationProvider>
  );
}
