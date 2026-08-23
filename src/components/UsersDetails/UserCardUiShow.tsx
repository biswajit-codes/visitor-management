"use client";

import {
  CalendarDays,
  Check,
  Clock3,
  Mail,
  Pencil,
  Phone,
  Tag,
  UserRound,
} from "lucide-react";

import { User } from "@generated/prisma/client";
import Link from "next/link";
import CheckinButton from "../Button/CheckinButton";
import DeleteButton from "../Button/DeleteButton";
import { Card, CardContent, CardFooter } from "../shadcnui/card";
import { DateTimeView } from "../SideBarComp/DateTimeView";

type VisitorDataprops = {
  visitorData: User;
};

const UserCardUiShow = ({
  visitorData: {
    id,
    name,
    email,
    phone,
    purpose,
    createdAt,
    registeredAt,
    updatedAt,
  },
}: VisitorDataprops) => {
  const registerDate = new Date(registeredAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const registerTime = new Date(registeredAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="w-full max-w-md rounded-2xl">
      <CardContent className="p-0">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Checked In
            </span>
          </div>

          {/* <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button> */}

          <Link href={`/user/&{id}`}>
            <Pencil color="#5c5c5c" />
          </Link>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="flex flex-col items-center px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="relative">
            <div className="bg-primary/10 text-primary ring-primary/5 flex h-14 w-14 items-center justify-center rounded-full text-base font-bold ring-4 sm:h-16 sm:w-16 sm:text-lg">
              AH
            </div>

            <span className="border-card absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-[3px] bg-emerald-500 sm:h-4 sm:w-4" />
          </div>

          <h2 className="text-foreground mt-2.5 text-lg font-bold tracking-tight sm:text-xl">
            {name}
          </h2>

          <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs">
            <UserRound className="h-3.5 w-3.5" />
            Registered User
          </div>
        </div>

        {/* ================= DATE & TIME ================= */}
        <div className="border-border mx-3 mb-3 grid grid-cols-2 overflow-hidden rounded-lg border sm:mx-4 sm:mb-4 sm:rounded-xl">
          {/* Date */}
          <div className="border-border flex min-w-0 items-center gap-2 border-r px-2.5 py-2.5 sm:gap-2.5 sm:px-3 sm:py-3">
            <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg">
              <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            <div className="grid min-w-0">
              <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                Register time & Date
              </p>

              {/* truncate সরিয়ে whitespace-normal, break-words এবং leading-tight যোগ করা হয়েছে */}
              <p className="text-foreground mt-0.5 text-xs leading-tight wrap-break-word whitespace-normal sm:text-sm">
                {registerDate}{" "}
                <span className="text-muted-foreground ml-1">
                  {registerTime}
                </span>
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex min-w-0 items-center gap-2 px-2.5 py-2.5 sm:gap-2.5 sm:px-3 sm:py-3">
            <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg">
              <Clock3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                checkin time & Date
              </p>

              <p className="text-foreground mt-0.5 text-[11px] font-semibold whitespace-nowrap sm:text-sm">
                10:30 AM
              </p>
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="border-border border-t">
          <div className="grid grid-cols-2">
            {/* PHONE */}
            <div className="border-border flex min-w-0 items-center gap-2 border-r border-b px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
              <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                  Phone
                </p>

                <p className="text-foreground mt-0.5 text-[10px] font-semibold tracking-tight whitespace-nowrap sm:text-xs">
                  {phone}
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="border-border flex min-w-0 items-center gap-2 border-b px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
              <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                  Email
                </p>

                <p className="text-foreground mt-0.5 truncate text-[10px] font-semibold sm:text-xs">
                  {email}
                </p>
              </div>
            </div>

            {/* PURPOSE */}
            <div className="border-border flex min-w-0 items-center gap-2 border-r px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
              <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg">
                <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                  Purpose
                </p>

                <p className="text-foreground mt-0.5 truncate text-[10px] font-semibold sm:text-xs">
                  {purpose}
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="flex min-w-0 items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 sm:h-8 sm:w-8 sm:rounded-lg dark:text-emerald-400">
                <Check
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  strokeWidth={2.5}
                />
              </div>

              <div className="min-w-0">
                <p className="text-muted-foreground text-[8px] font-semibold tracking-wider uppercase sm:text-[9px]">
                  Status
                </p>

                <p className="mt-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-600 sm:text-xs dark:text-emerald-400">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="bg-muted/30 border-border flex items-center justify-between gap-2 border-t px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

            <span className="text-muted-foreground truncate text-[9px] font-medium sm:text-xs">
              Visitor is currently active
            </span>
          </div>

          <span className="text-muted-foreground shrink-0 text-[9px] font-medium sm:text-xs">
            #USR-001
          </span>

          <div></div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-3">
        <DeleteButton UserId={id} />
        <CheckinButton />
      </CardFooter>
    </Card>
  );
};

export default UserCardUiShow;
