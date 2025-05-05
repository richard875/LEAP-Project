"use server";

import { eq } from "drizzle-orm";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { v4 as uuidv4 } from "uuid";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";
import getOpenAIClient from "@/lib/openai/openaiClient";
import SYSTEM_PROMPT from "@/lib/openai/openaiSystemPrompt";
import { posts, conversations } from "@/lib/schema";
import ConversationItem from "@/types/conversationItem";

import NewChatSchema from "../validators/newChatSchema";

async function newChat(question: ConversationItem, questionId: string) {
  try {
    // Validate input
    const result = NewChatSchema.safeParse({ ...question, questionId });
    if (!result.success) {
      const messages = result.error.flatten().fieldErrors;
      return { status: 400, error: "Validation failed", messages };
    }

    const { id, date, content, type, questionId: validQId } = result.data;
    const parsedDate = new Date(date);

    const existingPosts = await db
      .select()
      .from(conversations)
      .where(eq(conversations.questionId, validQId))
      .orderBy(conversations.date)
      .execute();

    if (existingPosts.length === 0) {
      await db.insert(posts).values({ id: validQId, date: parsedDate });
    }

    await db.insert(conversations).values({
      id,
      questionId: validQId,
      type,
      content,
      date: parsedDate,
    });

    const messages: ChatCompletionMessageParam[] = [];
    messages.push({ role: "developer", content: SYSTEM_PROMPT });

    for (const post of existingPosts) {
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
      content: completion.choices?.[0]?.message?.content || "",
      type: ConversationType.Answer,
    };

    await db.insert(conversations).values({
      id: response.id,
      questionId: validQId,
      type: response.type,
      content: response.content,
      date: response.date,
    });

    return response;
  } catch (error) {
    return { status: 500, error: "Internal server error", messages: error };
  }
}

export default newChat;
