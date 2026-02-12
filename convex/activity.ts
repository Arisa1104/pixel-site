import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logActivity = mutation({
  args: {
    type: v.string(),
    action: v.string(), description: v.string(),
    status: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activity", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const getRecentActivity = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("activity")
      .withIndex("by_timestamp")
      .order("desc")
      .take(50);
  },
});
