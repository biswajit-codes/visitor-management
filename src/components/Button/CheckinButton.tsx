"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck } from "lucide-react";

import createCheckin from "@/server/checkin/createCheckin";
import { Button } from "../shadcnui/button";
import { toast } from "../shadcnui/toast";

type CheckinButtonProps = {
  userId: string;
};

const CheckinButton = ({ userId }: CheckinButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const checkinHandler = async () => {
    try {
      setIsLoading(true);

      const { isSuccess, message } = await createCheckin(userId);

      if (isSuccess) {
        toast.add({
          type: "success",
          description: message,
        });

        router.refresh();
      } else {
        toast.add({
          type: "error",
          description: message,
          priority: "high",
        });
      }
    } catch (error) {
      console.error("Check-in failed:", error);

      toast.add({
        type: "error",
        description: "Something went wrong during check-in.",
        priority: "high",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={checkinHandler}
      className="group flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-green-400/30 bg-linear-to-r from-green-500 via-green-500 to-green-600 text-center text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-green-400/50 hover:from-green-600 hover:via-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30 active:translate-y-0 active:scale-[0.98] active:shadow-md">
      <UserCheck
        color="#e5fff2"
        size={20}
        strokeWidth={3.5}
        className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-[-10deg]"
      />

      <span>{isLoading ? "Checking in..." : "Check-in"}</span>
    </Button>
  );
};

export default CheckinButton;
