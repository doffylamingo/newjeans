import React from "react";
import Image from "next/image";

import { members } from "@/lib/constants";

export default function page() {
  return (
    <div className="max-w-full md:px-0">
      {members.map((member, index) => (
        <div
          key={index}
          className={`mb-8 flex flex-col md:mb-0 md:flex md:items-end ${
            index % 2 === 1
              ? "md:flex-row-reverse md:bg-neutral-200"
              : "md:flex-row"
          }`}
        >
          <div className="w-full md:w-[800px]">
            <Image
              priority
              unoptimized
              alt={member.name}
              className="h-auto w-full object-cover md:drop-shadow-xl/25"
              height={1200}
              sizes="(max-width: 768px) 100vw, 800px"
              src={member.image}
              width={800}
            />
          </div>

          <div className="flex flex-col px-2 text-center md:flex-1 md:pl-6 md:text-left">
            <div className="text-2xl font-bold tracking-tighter uppercase md:-ml-1 md:text-4xl lg:text-7xl">
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
