import Link from "next/link";

export default function NavItems({
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
        href={href}
      >
        <span className="bg-gradient-to-r from-black to-black bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-all duration-700 ease-out group-hover:bg-[length:100%_3px]">
          {name}
        </span>
      </Link>
    </div>
  );
}
