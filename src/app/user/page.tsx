import UserRegForm from "@/components/Registration/UserRegForm";
import { Card, CardContent } from "@/components/shadcnui/card";
import UserCardUiShow from "@/components/UsersDetails/UserCardUiShow";
import prisma from "@/lib/dbClient/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page - Dashboard",
  description: "Production grade Fullstack Next.js starter template",

  alternates: {
    canonical: "https://localhost:3000/",
  },
};

const page = async () => {
  const allvisitor = await prisma.user.findMany();

  if (allvisitor.length === 0) {
    <section>
      <div className="">No Visitors</div>
    </section>;
  }

  return (
    <>
      <main className="bg-background relative transition-colors">
        <div className="grid w-full grid-cols-1 gap-4 px-4 py-2.5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3"></div>
      </main>
    </>
  );
};

export default page;
