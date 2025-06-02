import { createRootRoute, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/NavBar";

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-[68rem] mx-auto">
      <NavBar />
      <Outlet />
    </div>
  ),
});
