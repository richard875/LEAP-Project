import { NextResponse } from "next/server";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";

import { posts, conversations } from "@/lib/schema";

export async function POST(req: Request) {
  const { id, date, text } = await req.json();
  if (!id || !date || !text) {
    return NextResponse.json({ error: "Empty Text" }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
  }

  await db
    .insert(posts)
    .values({
      id,
      date: parsedDate,
    })
    .returning();

  await db
    .insert(conversations)
    .values({
      questionId: id,
      type: ConversationType.Question,
      text,
      date: parsedDate,
    })
    .returning();

  return NextResponse.json({});
}
