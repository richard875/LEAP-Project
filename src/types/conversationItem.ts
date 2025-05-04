import ConversationType from "@/enums/conversationType";

type ConversationItem = {
  id: string;
  date: Date;
  content: string;
  type: ConversationType;
};

export default ConversationItem;
