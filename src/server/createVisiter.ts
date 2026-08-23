"use server";

import prisma from "@/lib/dbClient/prisma";
import { UserRegistrationType } from "@/lib/schema";
import { revalidatePath } from "next/cache";

const createVisiter = async (uData: UserRegistrationType) => {
  try {
    await prisma.user.create({
      data: uData,
    });

    revalidatePath("/user");

    return {
      isSuccess: true,
      message: "Visitor Register SuccesFully✔️👍",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Visitor Register Failed ❌🥱",
    };
  }
};

export default createVisiter;
