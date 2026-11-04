"use server";

import prisma from "@/lib/dbClient/prisma";
import { revalidatePath } from "next/cache";

const deleteUser = async (UserId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: UserId,
      },
    });

    revalidatePath("/user");

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
