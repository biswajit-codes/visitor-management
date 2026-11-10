"use server";

import "server-only";

import prisma from "@/lib/dbClient/prisma";
import { VisitStatus } from "@generated/prisma/client";
import { revalidatePath } from "next/cache";

const createCheckin = async (userId: string) => {
  try {
    // Check whether user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        isSuccess: false,
        message: "User not found.",
      };
    }

    // Prevent duplicate active check-in
    const activeVisit = await prisma.visit.findFirst({
      where: {
        userId,
        status: VisitStatus.ACTIVE,
      },
    });

    if (activeVisit) {
      return {
        isSuccess: false,
        message: "This user is already checked in.",
      };
    }

    // Create new visit
    await prisma.visit.create({
      data: {
        userId: user.id,
        purpose: user.purpose,
        status: VisitStatus.ACTIVE,
        checkInAt: new Date(),
      },
    });

    // Refresh visitor lists
    revalidatePath("/user");
    revalidatePath("/user/checkin");

    return {
      isSuccess: true,
      message: "Visitor checked in successfully.",
    };
  } catch (error) {
    console.error("Check-in Error:", error);

    return {
      isSuccess: false,
      message: "Visitor check-in failed.",
    };
  }
};

export default createCheckin;
