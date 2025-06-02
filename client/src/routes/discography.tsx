import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/discography")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/discography"!</div>;
}
