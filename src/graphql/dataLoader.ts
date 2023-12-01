import prisma from "../config/prisma";

export const getUser = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id: id } });
  } catch (err) {
    return null;
  }
};
