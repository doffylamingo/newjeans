"use client";

import { useEffect, useState } from "react";
import Socials from "./Socials";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";

const NAV_ITEMS = [
  { href: "/", name: "Home" },
  { href: "/profile", name: "Profile" },
  { href: "/discography", name: "Discography" },
  { href: "/gallery", name: "Gallery" },
  { href: "/video", name: "Video" },
];

function BurgerMenu({
  isOpen,
  pathname,
  openCloseMenu,
}: {
  isOpen: boolean;
  pathname: string;
  openCloseMenu: () => void;
}) {
  const lineColor = pathname === "/" && !isOpen ? "bg-white" : "bg-black";

  return (
    <div onClick={openCloseMenu} className="z-40 relative cursor-pointer">
      <div
        className={cn(
          "w-12 h-[2px] my-1 transition-all duration-300",
          ` ${isOpen ? "absolute top-0 rotate-45" : ""}`,
          `${lineColor}`
        )}
      ></div>
      <div
        className={cn(
          "w-12 h-[2px] my-1 transition-all duration-300",
          ` ${isOpen ? "absolute top-0 -rotate-45" : ""}`,
          `${lineColor}`
        )}
      ></div>
      <div
        className={cn(
          "w-12 h-[2px] my-1 transition-all",
          ` ${isOpen ? "opacity-0" : ""}`,
          `${lineColor}`
        )}
      ></div>
    </div>
  );
}

function NavItems({
  href,
  name,
  openCloseMenu,
}: {
  href: string;
  name: string;
  openCloseMenu: () => void;
}) {
  return (
    <div onClick={openCloseMenu} className="py-2">
      <Link
        className="group uppercase text-5xl font-semibold text-black transition-all duration-500 ease-in-out"
        to={href}
      >
        <span className="bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-700 ease-out">
          {name}
        </span>
      </Link>
    </div>
  );
}

export default function NavBar() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

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
    <>
      <header className="sticky z-40 top-0 flex justify-between items-center px-0 py-14">
        <div className="relative">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="newjeans logo" width={220} height={70} />
          </Link>
        </div>
        <BurgerMenu
          isOpen={isOpen}
          openCloseMenu={openCloseMenu}
          pathname={pathname}
        />
      </header>
      {isOpen && (
        <div className="fixed z-30 top-0 left-0 h-screen w-full bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col text-center">
              {NAV_ITEMS.map((item, i) => (
                <NavItems
                  key={i}
                  href={item.href}
                  name={item.name}
                  openCloseMenu={openCloseMenu}
                />
              ))}
            </div>
            <div className="flex flex-row items-center justify-center absolute bottom-10">
              <Socials />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
