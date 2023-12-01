/** Internal */
import { Context } from "../types";
import { getUser } from "./dataLoader";

export const resolvers = {
  Query: {
    sayHello: (_: any, __: any, ctx: Context) =>
      `Hello ${ctx.name}. You are ${
        ctx.user ? "authenticated" : "not authenticated"
      }`,
    me: async (_: any, __: any, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return getUser(ctx.user.id);
    },
  },
};
