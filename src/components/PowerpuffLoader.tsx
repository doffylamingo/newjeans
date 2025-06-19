import Image from "next/image";

import { SPRITES } from "@/lib/constants";

export default function PowerpuffLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex space-x-5">
        {SPRITES.map((sprite, index) => (
          <Image
            key={sprite}
            priority
            alt={`Character ${index + 1}`}
            className="animate-bounce object-contain"
            height={72}
            src={sprite}
            style={{ animationDelay: `${index * 0.25}s` }}
            width={72}
          />
        ))}
      </div>
    </div>
  );
}
