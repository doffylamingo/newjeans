import Image from "next/image";
import Link from "next/link";

const SNS_ITEMS = [
  {
    href: "https://www.instagram.com/newjeans_official/",
    logo: "/icons/instagram.png",
    name: "Instagram",
  },
  {
    href: "https://twitter.com/NewJeans_ADOR",
    logo: "/icons/twitter.png",
    name: "Twitter",
  },
  {
    href: "https://twitter.com/NewJeans_twt",
    logo: "/icons/twitter.png",
    name: "Twitter",
  },
  {
    href: "https://www.facebook.com/official.newjeans/",
    logo: "/icons/facebook.png",
    name: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@newjeans_official",
    logo: "/icons/tiktok.png",
    name: "TikTok",
  },
  {
    href: "https://www.youtube.com/channel/UCMki_UkHb4qSc0qyEcOHHJw",
    logo: "/icons/youtube.png",
    name: "YouTube",
  },
];

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
