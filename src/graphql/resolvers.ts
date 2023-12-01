/** Internal */
import { Context } from "../types";
import { getUser, getWorkspace, getMedia, createWorkspace } from "./dataLoader";
import { Workspace } from "@prisma/client";

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
    workspace: async (_: any, { id }: { id: number }, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return await getWorkspace(id);
    },
    media: async (_: any, { id }: { id: number }, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return await getMedia(id);
    },
  },

  Mutation: {
    createWorkspace: async (_: any, workspace: Workspace, ctx: Context) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return await createWorkspace(workspace);
    },
  },
};
