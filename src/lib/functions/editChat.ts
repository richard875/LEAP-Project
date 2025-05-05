"use server";

import { eq } from "drizzle-orm";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { v4 as uuidv4 } from "uuid";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";
import getOpenAIClient from "@/lib/openai/openaiClient";
import SYSTEM_PROMPT from "@/lib/openai/openaiSystemPrompt";
import { conversations } from "@/lib/schema";
import ConversationItem from "@/types/conversationItem";

import ModifyChatSchema from "../validators/modifyChatSchema";

async function editChat(question: ConversationItem) {
  try {
    // Validate input
    const result = ModifyChatSchema.safeParse(question);
    if (!result.success) {
      const messages = result.error.flatten().fieldErrors;
      return { status: 400, error: "Validation failed", messages: messages };
    }

    const { id, content } = result.data;

    // Start reading and inserting the question into the database
    const [currentConversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id))
      .limit(1)
      .execute();

    const currentQuestionId = currentConversation.questionId;
    const existingPosts = await db
      .select()
      .from(conversations)
      .where(eq(conversations.questionId, currentQuestionId))
      .orderBy(conversations.date)
      .execute();

    // Delete everything after currentConversation.id from the existingPosts in database
    const index = existingPosts.findIndex(
      (item) => item.id === currentConversation.id
    );
    if (index === -1) return { status: 404, error: "Conversation not found" };

    const toKeep = existingPosts.slice(0, index);
    const toDelete = existingPosts.slice(index + 1);

    for (const conv of toDelete) {
      await db
        .delete(conversations)
        .where(eq(conversations.id, conv.id))
        .execute();
    }

    // Update the current conversation
    await db
      .update(conversations)
      .set({ content, date: new Date() })
      .where(eq(conversations.id, id))
      .execute();

    // Query OpenAI API
    const messages: ChatCompletionMessageParam[] = [];
    messages.push({ role: "developer", content: SYSTEM_PROMPT });

    for (const post of toKeep) {
      messages.push({
        role: post.type === ConversationType.Question ? "user" : "assistant",
        content: post.content,
      });
    }
    messages.push({ role: "user", content });

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      store: false,
      model: "gpt-4.1-mini",
      messages,
    });

    const response: ConversationItem = {
      id: uuidv4(),
      date: new Date(),
      content: completion.choices[0].message.content as string,
      type: ConversationType.Answer,
    };

    await db.insert(conversations).values({
      id: response.id,
      questionId: currentQuestionId,
      type: response.type,
      content: response.content,
      date: response.date,
    });

    return response;
  } catch (error) {
    return { status: 500, error: "Internal server error", messages: error };
  }
}

export default editChat;
