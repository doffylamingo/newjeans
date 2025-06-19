import { cn } from "@/lib/utils";

export default function BurgerMenu({
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
