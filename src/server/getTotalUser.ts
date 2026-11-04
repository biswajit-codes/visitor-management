import "server-only";
import prisma from "@/lib/dbClient/prisma";

const getTotalUser = () => {
  return prisma.user.count();
};

export default getTotalUser;
