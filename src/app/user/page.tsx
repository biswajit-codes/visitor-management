import UserCardUiShow from "@/components/UsersDetails/UserCardUiShow";
import prisma from "@/lib/dbClient/prisma";

const page = async () => {
  const allVisitor = await prisma.user.findMany({
    where: {
      visits: {
        none: {},
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (allVisitor.length === 0) {
    return (
      <div className="grid h-[85dvh] place-items-center">
        <div className="text-2xl font-bold">No Registered Users Found</div>
      </div>
    );
  }

  return (
    <>
      <div className="3xl:grid-cols-4 grid w-full grid-cols-1 gap-4 px-4 py-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {allVisitor.map((visitor) => (
          <UserCardUiShow
            key={visitor.id}
            visitorData={visitor}
          />
        ))}
      </div>
    </>
  );
};

export default page;
