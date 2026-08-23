"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../shadcnui/button";
import deleteUser from "@/server/deleteUser";
import { toast } from "../shadcnui/toast";
import { useRouter } from "next/navigation";

type UserDeleteProps = {
  UserId: string;
};

const DeleteButton = ({ UserId }: UserDeleteProps) => {
  const { refresh } = useRouter();
  const deleteHandler = async () => {
    const { isSuccess, message } = await deleteUser(UserId);

    if (isSuccess) {
      toast.add({
        type: "success",
        description: message,
      });
      refresh();
    } else {
      toast.add({
        type: "error",
        description: message,
        priority: "high",
      });
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={deleteHandler}
        className="group w-full rounded-xl border border-red-400/30 bg-linear-to-r from-red-500 via-red-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-red-400/50 hover:from-red-600 hover:via-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/30 active:translate-y-0 active:scale-[0.98] active:shadow-md">
        <Trash2
          size={20}
          strokeWidth={2.5}
          className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-[-10deg]"
        />

        <span>Delete</span>
      </Button>
    </>
  );
};

export default DeleteButton;
