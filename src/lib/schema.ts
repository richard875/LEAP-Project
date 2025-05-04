import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// Posts table
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
});

// Conversations table
export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  content: text("content").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const postsRelations = relations(posts, ({ many }) => ({
  conversations: many(conversations),
}));

export const conversationsRelations = relations(conversations, ({ one }) => ({
  post: one(posts, {
    fields: [conversations.questionId],
    references: [posts.id],
  }),
}));
