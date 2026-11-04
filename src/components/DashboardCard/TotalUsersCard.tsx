import { TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../shadcnui/card";
import getTotalUser from "@/server/getTotalUser";

const TotalUsersCard = async () => {
    const totalUsers = await getTotalUser();

    return (
        <>

            <Card className="aspect-video rounded-2xl border-0 bg-[#e8f5e9] shadow-[8px_8px_18px_#c8d9ca,-8px_-8px_18px_#ffffff] transition-all duration-300 dark:bg-card dark:shadow-[8px_8px_18px_#111116,-8px_-8px_18px_#292932]">
                <CardContent className="flex h-full items-center gap-4 p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8f5e9] text-[#388e3c] shadow-[5px_5px_10px_#c8d9ca,-5px_-5px_10px_#ffffff] transition-all duration-300 dark:bg-card dark:text-green-400 dark:shadow-[5px_5px_10px_#111116,-5px_-5px_10px_#292932]">
                        <Users className="h-7 w-7" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-wide text-[#68916b] dark:text-green-300">
                            Total Users
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold text-[#285c32] dark:text-green-100">
                            {totalUsers}
                        </h2>

                        <p className="mt-1 text-xs font-medium text-[#7a9b7d] dark:text-muted-foreground">
                            Registered users
                        </p>
                    </div>
                </CardContent>
            </Card>



        </>
    );
};

export default TotalUsersCard;