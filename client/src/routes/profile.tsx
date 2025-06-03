import { createFileRoute } from "@tanstack/react-router";

import { members } from "@/lib/constants";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="max-w-full md:px-0">
      {members.map((member, index) => (
        <div
          key={index}
          className={`mb-8 flex flex-col gap-3 md:mb-0 md:flex md:items-end md:gap-5 ${
            index % 2 === 1
              ? "md:flex-row-reverse md:bg-neutral-200"
              : "md:flex-row"
          }`}
        >
          <div className="w-full md:w-auto">
            <img
              alt={member.name}
              className="w-full md:drop-shadow-xl/25"
              src={member.image}
            />
          </div>
          <div className="flex flex-col px-2 text-center md:flex-1 md:pl-1 md:text-left">
            <div className="text-2xl font-bold tracking-tighter uppercase md:-ml-1 md:text-4xl lg:text-6xl">
              {member.name}
            </div>
            <div className="font-base pb-1 text-sm text-gray-700 md:pt-2 md:pb-15 md:text-base lg:text-xl">
              {member.birthday}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
