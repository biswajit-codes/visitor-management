import TotalUsersCard from "@/components/DashboardCard/TotalUsersCard";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page - Dashboard",
  description: "Visiter Management System",

  alternates: {
    canonical: "https://localhost:3000/",
  },
};

const page = async () => {
  const totalUsers = await TotalUsersCard();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <span>
              {totalUsers}
            </span>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">2</div>
          <div className="bg-muted/50 aspect-video rounded-xl">3</div>
          <div className="bg-muted/50 aspect-video rounded-xl">4</div>
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
          okdgsy
        </div>
      </div>
    </>
  );
};

export default page;


// import { Users } from "lucide-react";
// import getTotalUser from "@/server/getTotalUser";
// import { Card, CardContent } from "@/components/shadcnui/card";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Home Page - Dashboard",
//   description: "Visitor Management System",
// };

// const Page = async () => {
//   const totalUsers = await getTotalUser();

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div className="grid auto-rows-min gap-4 md:grid-cols-4">
//         {/* Total Users */}
//         <Card className="bg-muted/50 aspect-video rounded-xl border-0 shadow-none">
//           <CardContent className="flex h-full items-center gap-4 p-5">
//             <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
//               <Users className="h-6 w-6" />
//             </div>

//             <div>
//               <p className="text-muted-foreground text-sm font-medium">
//                 Total Users
//               </p>

//               <h2 className="text-foreground mt-1 text-3xl font-bold">
//                 {totalUsers}
//               </h2>

//               <p className="text-muted-foreground mt-1 text-xs">
//                 Registered users
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="bg-muted/50 aspect-video rounded-xl">2</div>
//         <div className="bg-muted/50 aspect-video rounded-xl">3</div>
//         <div className="bg-muted/50 aspect-video rounded-xl">4</div>
//       </div>

//       <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min">
//         okdgsy
//       </div>
//     </div>
//   );
// };

// export default Page;