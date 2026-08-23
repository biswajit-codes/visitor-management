import UserRegForm from "@/components/Registration/UserRegForm";
import { Card, CardContent } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page - Dashboard",
  description: "Production grade Fullstack Next.js starter template",

  alternates: {
    canonical: "https://localhost:3000/",
  },
};

const page = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">1</div>
          <div className="bg-muted/50 aspect-video rounded-xl">2</div>
          <div className="bg-muted/50 aspect-video rounded-xl">3</div>
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          okdgsy
        </div>
      </div>
    </>
  );
};

export default page;
