import UserRegForm from "@/components/Registration/UserRegForm";
import { Card, CardContent } from "@/components/shadcnui/card";
import { DateTimeView } from "@/components/SideBarComp/DateTimeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page - Dashboard",
  description: "Production grade Fullstack Next.js starter template",

  alternates: {
    canonical: "http://localhost:3000/user/registration",
  },
};

const page = () => {
  return (
    <>
      <main className="bg-background relative min-h-[93dvh] overflow-hidden px-4 py-6 transition-colors sm:px-6 sm:py-8 lg:px-8">
        <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl sm:h-80 sm:w-80 dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl sm:h-80 sm:w-80 dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-3xl sm:h-72 sm:w-72 dark:bg-blue-500/5" />
        <div className="relative z-10 mx-auto flex h-full max-w-2xl items-center justify-center">
          <Card className="border-border/70 bg-card/80 text-card-foreground w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl shadow-indigo-200/30 backdrop-blur-2xl backdrop-saturate-150 dark:shadow-black/30">
            <CardContent className="p-5 sm:p-7 md:p-8">
              <UserRegForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default page;
