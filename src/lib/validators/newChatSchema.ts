import { z } from "zod";

import { baseChatFields } from "./chatSchemaBase";

const NewChatSchema = z.object({
  ...baseChatFields,
  questionId: z
    .string({ required_error: "Question ID is required" })
    .uuid({ message: "Question ID must be a valid UUID" }),
});

export default NewChatSchema;
