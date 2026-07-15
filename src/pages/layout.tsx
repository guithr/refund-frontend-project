import { Outlet, Link, useLocation } from "react-router";
import { Toaster } from "sonner";
import LogoSvg from "../assets/icons/logo.svg?react";
import { NavLink } from "../components/NavLink";
import { Button } from "../components/Button";

export function Layout() {
  const location = useLocation();
  const isActive = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-gray-400 py-10 px-4">
      <header className="mx-auto flex w-full max-w-[1185px] items-center justify-between">
        <LogoSvg />
        <nav className="flex items-center gap-4">
          <NavLink to="/" isActive={isActive}>
            Solicitações de reembolso
          </NavLink>
          <Link to="/novo">
            <Button>Nova solicitação</Button>
          </Link>
        </nav>
      </header>

      <Outlet />

      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: "#1F2523",
            color: "#F9FBFA",
            border: "none",
            fontSize: 14,
            fontFamily: "Open Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}
