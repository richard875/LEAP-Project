"use server";

import { eq } from "drizzle-orm";

import db from "@/lib/db";
import { conversations } from "@/lib/schema";
import ConversationItem from "@/types/conversationItem";

import ModifyChatSchema from "../validators/modifyChatSchema";

async function deleteChat(question: ConversationItem) {
  try {
    // Validate input
    const result = ModifyChatSchema.safeParse(question);
    if (!result.success) {
      const messages = result.error.flatten().fieldErrors;
      return { status: 400, error: "Validation failed", messages: messages };
    }

    // Start reading and deleting the question into the database
    const [currentConv] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, result.data.id))
      .limit(1)
      .execute();

    const existingPosts = await db
      .select()
      .from(conversations)
      .where(eq(conversations.questionId, currentConv.questionId))
      .orderBy(conversations.date)
      .execute();

    // Delete everything after currentConversation.id inclusive from the existingPosts in database
    const index = existingPosts.findIndex((item) => item.id === currentConv.id);
    if (index === -1) return { status: 404, error: "Conversation not found" };

    const toDelete = existingPosts.slice(index);
    for (const conv of toDelete) {
      await db
        .delete(conversations)
        .where(eq(conversations.id, conv.id))
        .execute();
    }

    return { success: true };
  } catch (error) {
    return { status: 500, error: "Internal server error", messages: error };
  }
}

export default deleteChat;
