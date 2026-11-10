import prisma from "@/lib/dbClient/prisma";
import { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // always reflect current occupancy, never cache

// ---------- helpers ----------

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function formatElapsed(checkInAt: Date | null) {
  if (!checkInAt) return "Time not recorded";

  const minutes = Math.floor((Date.now() - checkInAt.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (hours < 24) {
    return remMinutes > 0 ? `${hours}h ${remMinutes}m ago` : `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatCheckInTime(checkInAt: Date | null) {
  if (!checkInAt) return "Time not recorded";
  return checkInAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

// Visitors checked in more than this long are flagged for front-desk attention.
const OVERDUE_THRESHOLD_MINUTES = 240; // 4 hours

function isOverdue(checkInAt: Date | null) {
  if (!checkInAt) return false;
  return (Date.now() - checkInAt.getTime()) / 60000 > OVERDUE_THRESHOLD_MINUTES;
}

// ---------- data ----------

const MAX_VISIBLE_VISITORS = 100;

async function getCheckedInVisitors() {
  return prisma.visit.findMany({
    where: { status: "ACTIVE" },
    include: { user: true },
    orderBy: { checkInAt: "desc" },
    take: MAX_VISIBLE_VISITORS,
  });
}

type CheckedInVisitor = Awaited<
  ReturnType<typeof getCheckedInVisitors>
>[number];

// ---------- empty state ----------

function EmptyState() {
  return (
    <div className="grid min-h-[70dvh] place-items-center px-4">
      <div className="text-center">
        <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-muted-foreground h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">No Visitors Checked In</h2>
        <p className="text-muted-foreground mx-auto mt-1 max-w-xs text-sm">
          Visitors will show up here as soon as they check in at the front desk.
        </p>
      </div>
    </div>
  );
}

// ---------- row ----------

function VisitorRow({ visit }: { visit: CheckedInVisitor }) {
  const overdue = isOverdue(visit.checkInAt);

  return (
    <tr className="hover:bg-muted/40 border-b last:border-0">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
            {getInitials(visit.user.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{visit.user.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {visit.user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="text-muted-foreground px-4 py-3 text-sm whitespace-nowrap">
        {visit.user.phone || "—"}
      </td>

      <td className="px-4 py-3 text-sm">
        <span className="line-clamp-1">{visit.purpose || "—"}</span>
      </td>

      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <span title={formatCheckInTime(visit.checkInAt)}>
          {formatElapsed(visit.checkInAt)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span
          className={
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium " +
            (overdue ?
              "bg-amber-50 text-amber-700"
            : "bg-green-50 text-green-700")
          }>
          <span
            aria-hidden
            className={
              "h-1.5 w-1.5 rounded-full " +
              (overdue ? "bg-amber-500" : "animate-pulse bg-green-500")
            }
          />
          {overdue ? "Overdue" : "Checked In"}
        </span>
      </td>

      <td className="px-4 py-3 text-right">
        <Link
          href={`/visits/${visit.id}/checkout` as Route}
          className="text-primary text-sm font-medium hover:underline">
          Check out
        </Link>
      </td>
    </tr>
  );
}

// ---------- page ----------

async function VisitorsTable() {
  const checkedInVisitors = await getCheckedInVisitors();

  if (checkedInVisitors.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="px-4 py-2.5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Checked-in Visitors</h1>
          <p className="text-muted-foreground text-sm">
            {checkedInVisitors.length} visitor
            {checkedInVisitors.length === 1 ? "" : "s"} currently on site
            {checkedInVisitors.length === MAX_VISIBLE_VISITORS ?
              ` (showing first ${MAX_VISIBLE_VISITORS})`
            : ""}
          </p>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b text-left">
                <th className="text-muted-foreground px-4 py-2.5 text-xs font-medium uppercase">
                  Visitor
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-xs font-medium uppercase">
                  Phone
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-xs font-medium uppercase">
                  Purpose
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-xs font-medium uppercase">
                  Checked in
                </th>
                <th className="text-muted-foreground px-4 py-2.5 text-xs font-medium uppercase">
                  Status
                </th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {checkedInVisitors.map((visit) => (
                <VisitorRow
                  key={visit.id}
                  visit={visit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="px-4 py-2.5">
      <div className="bg-muted mb-4 h-7 w-56 animate-pulse rounded" />
      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <div className="divide-y">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3">
              <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="bg-muted h-3 w-32 animate-pulse rounded" />
                <div className="bg-muted h-2.5 w-44 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <VisitorsTable />
    </Suspense>
  );
}
