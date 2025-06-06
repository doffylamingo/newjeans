"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

import Socials from "./Socials";

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
    <div
      className="relative z-40 cursor-pointer"
      onClick={openCloseMenu}
    >
      <div
        className={cn(
          "my-1 h-[2px] w-8 transition-all duration-300 sm:w-10 md:w-12",
          ` ${isOpen ? "absolute top-0 rotate-45" : ""}`,
          `${lineColor}`,
        )}
      />
      <div
        className={cn(
          "my-1 h-[2px] w-8 transition-all duration-300 sm:w-10 md:w-12",
          ` ${isOpen ? "absolute top-0 -rotate-45" : ""}`,
          `${lineColor}`,
        )}
      />
      <div
        className={cn(
          "my-1 h-[2px] w-8 transition-all sm:w-10 md:w-12",
          ` ${isOpen ? "opacity-0" : ""}`,
          `${lineColor}`,
        )}
      />
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
    <div
      className="w-full py-2"
      onClick={openCloseMenu}
    >
      <Link
        className="group text-2xl font-semibold text-black uppercase transition-all duration-500 ease-in-out sm:text-3xl md:text-4xl lg:text-5xl"
        to={href}
      >
        <span className="bg-gradient-to-r from-black to-black bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-700 ease-out group-hover:bg-[length:100%_3px]">
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
    <div className="mx-auto max-w-[68rem] px-4 md:px-0">
      <header className="sticky top-0 z-40 flex items-center justify-between py-3 sm:py-4 md:py-14">
        <div className="relative flex-shrink-0">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
          >
            <img
              alt="newjeans logo"
              className="h-auto w-28 max-w-full sm:w-32 md:w-40 lg:w-52"
              src="/logo.png"
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
