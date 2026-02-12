import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    scheduledAt: v.number(),
    priority: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      ...args,
      status: "pending",
    });
  },
});

export const getWeeklyTasks = query({
  args: {
    startAt: v.number(),
    endAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_scheduledAt", (q) =>
        q.gte("scheduledAt", args.startAt).lte("scheduledAt", args.endAt)
      )
      .collect();
  },
});
