import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import { conversations } from "@/lib/schema";

export async function DELETE(req: Request) {
  const { id, date, content, type } = await req.json();
  if (!id || !date || !content || !type) {
    return NextResponse.json({ error: "Empty Text" }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid Date" }, { status: 400 });
  }

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

  // Delete everything after currentConversation.id inclusive from the existingPosts in database
  const index = existingPosts.findIndex(
    (item) => item.id === currentConversation.id
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  const toDelete = existingPosts.slice(index);
  for (const conversation of toDelete) {
    await db
      .delete(conversations)
      .where(eq(conversations.id, conversation.id))
      .execute();
  }

  return NextResponse.json({ success: true });
}
