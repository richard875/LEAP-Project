import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";
import getOpenAIClient from "@/lib/openaiClient";
import ConversationItem from "@/types/conversationItem";

import { posts, conversations } from "@/lib/schema";

export async function POST(req: Request) {
  const { id, date, content, type, questionId } = await req.json();
  if (!id || !date || !content || !type || !questionId) {
    return NextResponse.json({ error: "Empty Text" }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
  }

  // Start inserting the question into the database
  await db.insert(posts).values({ id: questionId, date: parsedDate });
  await db
    .insert(conversations)
    .values({ id, questionId, type, content, date: parsedDate });

  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    store: false,
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "developer",
        content: "You are a helpful assistant. Talk like a lawyer.",
      },
      { role: "user", content },
    ],
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
