import Image from "next/image";

import Socials from "@/components/Socials";

export default function Home() {
  return (
    <main className="mx-auto max-h-screen w-full max-w-[68rem]">
      <Image
        fill
        alt="banner-desktop"
        className="fixed inset-0 -z-10 hidden h-full w-full object-cover object-top brightness-[0.65] filter sm:block"
        src="/newjeans-cover.webp"
      />
      <Image
        fill
        alt="banner-mobile"
        className="fixed inset-0 -z-10 h-full w-full object-cover object-top brightness-[0.65] filter sm:hidden"
        src="/newjeans-cover-mobile.webp"
      />
      <div className="absolute bottom-10 flex invert md:bottom-15">
        <Socials />
      </div>
    </main>
  );
}
