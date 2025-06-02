import Socials from "@/components/Socials";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="w-full max-h-screen max-w-[68rem] mx-auto">
      <img
        src="/newjeans-cover.webp"
        alt="banner-image"
        className="object-cover w-full fixed object-top h-full inset-0 -z-10 filter brightness-[0.65]"
      />
      <div className="flex absolute bottom-15 invert">
        <Socials />
      </div>
    </main>
  );
}
