import Image from "next/image";

import { SPRITES } from "@/lib/constants";

export default function PowerpuffLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex space-x-2 sm:space-x-3 md:space-x-5">
        {SPRITES.map((sprite, index) => (
          <div
            key={sprite}
            className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]"
          >
            <Image
              fill
              priority
              alt={`Character ${index + 1}`}
              className="animate-bounce object-contain"
              sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 72px"
              src={sprite}
              style={{ animationDelay: `${index * 0.25}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
