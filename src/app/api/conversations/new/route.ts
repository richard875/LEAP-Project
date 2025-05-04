import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { v4 as uuidv4 } from "uuid";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";
import getOpenAIClient from "@/lib/openai/openaiClient";
import SYSTEM_PROMPT from "@/lib/openai/openaiSystemPrompt";
import { posts, conversations } from "@/lib/schema";
import ConversationItem from "@/types/conversationItem";


export async function POST(req: Request) {
  const { id, date, content, type, questionId } = await req.json();
  if (!id || !date || !content || !type || !questionId) {
    return NextResponse.json({ error: "Empty Text" }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
  }

  // Start reading and inserting the question into the database
  const existingPosts = await db
    .select()
    .from(conversations)
    .where(eq(conversations.questionId, questionId))
    .orderBy(conversations.date)
    .execute();

  if (existingPosts.length === 0) {
    await db.insert(posts).values({ id: questionId, date: parsedDate });
  }

  await db
    .insert(conversations)
    .values({ id, questionId, type, content, date: parsedDate });

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
    content: completion.choices[0].message.content as string,
    type: ConversationType.Answer,
  };

  await db.insert(conversations).values({
    id: response.id,
    questionId,
    type: response.type,
    content: response.content,
    date: response.date,
  });

  return NextResponse.json(response);
}
