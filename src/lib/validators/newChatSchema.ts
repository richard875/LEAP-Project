import { z } from "zod";

import ConversationType from "@/enums/conversationType";

const NewChatSchema = z.object({
  id: z
    .string({ required_error: "ID is required" })
    .uuid({ message: "ID must be a valid UUID" }),

  questionId: z
    .string({ required_error: "Question ID is required" })
    .uuid({ message: "Question ID must be a valid UUID" }),

  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content must not be empty"),

  type: z.nativeEnum(ConversationType, {
    errorMap: () => ({ message: "Type must be a valid conversation type" }),
  }),

  date: z
    .union([
      z
        .string()
        .datetime({ message: "Date must be a valid ISO datetime string" }),
      z.date({ required_error: "Date is required" }),
    ])
    .refine((val) => !!val, { message: "Date must be provided" }),
});

export default NewChatSchema;
