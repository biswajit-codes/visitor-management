"use client";

import { UserCheck } from "lucide-react";
import Link from "next/link";

const CheckinButton = () => {
  const checkinHandler = () => {
    console.log("Checkin - Success");
  };

  return (
    <>
      <Link
        href="/"
        onClick={checkinHandler}
        className="group flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-green-400/30 bg-linear-to-r from-green-500 via-green-500 to-green-600 text-center text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-green-400/50 hover:from-green-600 hover:via-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/30 active:translate-y-0 active:scale-[0.98] active:shadow-md">
        <UserCheck
          color="#e5fff2"
          size={20}
          strokeWidth={3.5}
          className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-[-10deg]"
        />

        <span>Check-in</span>
      </Link>
    </>
  );
};

export default CheckinButton;
