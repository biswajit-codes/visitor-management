"use server";

import prisma from "@/lib/dbClient/prisma";

const deleteUser = async (UserId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: UserId,
      },
    });

    return {
      isSuccess: true,
      message: "Visitor deleted SuccesFully✔️👍",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Visitor deleted Failed ❌🥱",
    };
  }
};

export default deleteUser;
