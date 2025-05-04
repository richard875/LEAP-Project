import { NextResponse } from "next/server";

import ConversationType from "@/enums/conversationType";
import db from "@/lib/db";

import { posts, conversations } from "@/lib/schema";

export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "Empty Text" }, { status: 400 });

  const post = await db.insert(posts).values({}).returning();

  await db
    .insert(conversations)
    .values({
      questionId: post[0].id,
      type: ConversationType.Question,
      text,
    })
    .returning();

  return NextResponse.json({});
}
