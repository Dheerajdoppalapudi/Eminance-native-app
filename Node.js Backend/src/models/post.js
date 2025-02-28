import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.js"; // Import users table

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"), // Store image URL
  createdAt: timestamp("created_at").defaultNow(),
});
