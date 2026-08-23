"use client";

export const DateTimeView = () => {
  return (
    <>
      <span className="text-xs font-extralight">
        {new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </>
  );
};
