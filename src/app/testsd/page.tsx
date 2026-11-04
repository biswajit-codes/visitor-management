import { Users } from "lucide-react";

import prisma from "@/lib/dbClient/prisma";
import { Card, CardContent } from "@/components/shadcnui/card";


const TotalUsersCard = async () => {
  const totalUsers = await prisma.user.count();

  return (
    <Card className="bg-muted/50 aspect-video rounded-xl border-0 shadow-none">
      <CardContent className="flex h-full items-center gap-4 p-5">
        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <Users className="h-6 w-6" />
        </div>

        <div>
          {/* <p className="text-muted-foreground text-sm font-medium">
            Total Users
          </p> */}

          <h2 className="text-foreground mt-1 text-3xl font-bold">
            {totalUsers}
          </h2>

          <p className="text-muted-foreground mt-1 text-xs">
            Registered users
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalUsersCard;