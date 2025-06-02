import { members } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="max-w-full md:px-0">
      {members.map((member, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex md:items-end gap-3 md:gap-5 mb-8 md:mb-0 ${
            index % 2 === 1
              ? "md:flex-row-reverse md:bg-neutral-200"
              : "md:flex-row"
          }`}
        >
          <div className="w-full md:w-auto">
            <img
              src={member.image}
              className="w-full md:drop-shadow-xl/25"
              alt={member.name}
            />
          </div>
          <div className="flex flex-col px-2 md:pl-1 text-center md:text-left md:flex-1">
            <div className="uppercase tracking-tighter md:-ml-1 text-2xl md:text-4xl lg:text-6xl font-bold">
              {member.name}
            </div>
            <div className="text-sm md:text-base lg:text-xl font-base text-gray-700 md:pt-2 md:pb-15 pb-1">
              {member.birthday}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
