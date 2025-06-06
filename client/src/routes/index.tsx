import { createFileRoute } from "@tanstack/react-router";

import Socials from "@/components/Socials";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-h-screen w-full max-w-[68rem]">
      <img
        alt="banner-desktop"
        className="fixed inset-0 -z-10 hidden h-full w-full object-cover object-top brightness-[0.65] filter sm:block"
        src="/newjeans-cover.webp"
      />
      <img
        alt="banner-mobile"
        className="fixed inset-0 -z-10 h-full w-full object-cover object-top brightness-[0.65] filter sm:hidden"
        src="/newjeans-cover-mobile.webp"
      />
      <div className="absolute bottom-15 flex invert">
        <Socials />
      </div>
    </main>
  );
}
