import Image from "next/image";
import Link from "next/link";

import { SNS_ITEMS } from "@/lib/constants";

export default function Socials() {
  return (
    <>
      {SNS_ITEMS.map((item, i) => (
        <Link
          key={i}
          className="px-4 transition-all duration-200 ease-in-out hover:scale-125"
          href={item.href}
          target="_blank"
        >
          <Image
            alt={item.name}
            height={20}
            src={item.logo}
            width={20}
          />
        </Link>
      ))}
    </>
  );
}
