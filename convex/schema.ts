import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activity: defineTable({
    type: v.string(), // "tool", "task", "message", "maintenance"
    action: v.string(),
    description: v.string(),
    status: v.string(), // "started", "completed", "failed"
    metadata: v.optional(v.any()),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
  
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    scheduledAt: v.number(),
    status: v.string(), // "pending", "completed", "cancelled"
    priority: v.string(), // "low", "medium", "high"
    metadata: v.optional(v.any()),
  }).index("by_scheduledAt", ["scheduledAt"]),
});
