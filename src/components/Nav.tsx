"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/lib/constants";
import BurgerMenu from "@/components/BurgerMenu";
import NavItems from "@/components/NavItems";
import Socials from "@/components/Socials";

export default function NavBar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const openCloseMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="mx-auto max-w-[68rem] px-4 md:px-0">
      <header className="sticky top-0 z-40 flex w-full items-center justify-between py-3 sm:py-4 md:py-14">
        <div className="relative flex-shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <Image
              priority
              alt="NewJeans logo"
              className="h-auto w-full"
              height={40}
              quality={100}
              sizes="
      (max-width: 640px) 7rem, 
      (max-width: 768px) 8rem, 
      (max-width: 1024px) 10rem,
      13rem"
              src="/logo.png"
              width={208}
            />
          </Link>
        </div>
        <div className="flex-shrink-0">
          <BurgerMenu
            isOpen={isOpen}
            openCloseMenu={openCloseMenu}
            pathname={pathname}
          />
        </div>
      </header>
      {isOpen && (
        <div className="fixed top-0 left-0 z-30 h-screen w-full overflow-hidden bg-white">
          <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="flex max-w-full flex-col text-center">
              {NAV_ITEMS.map((item, i) => (
                <NavItems
                  key={i}
                  href={item.href}
                  name={item.name}
                  openCloseMenu={openCloseMenu}
                />
              ))}
            </div>
            <div className="absolute bottom-10 hidden w-full flex-row items-center justify-center px-4 md:flex">
              <Socials />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
