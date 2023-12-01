/** Internal */
import prisma from "../config/prisma";
import { Workspace } from "@prisma/client";

export const getUser = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id: id } });
  } catch (err) {
    return null;
  }
};

export const getWorkspace = async (id: number) => {
  try {
    return await prisma.workspace.findUnique({ where: { id: id } });
  } catch (err) {
    return null;
  }
};

export const getMedia = async (id: number) => {
  try {
    return await prisma.media.findUnique({ where: { id: id } });
  } catch (err) {
    return null;
  }
};

export const createWorkspace = async (workspace: Workspace) => {
  try {
    return await prisma.workspace.create({
      data: workspace,
    });
  } catch (err) {
    return null;
  }
};
