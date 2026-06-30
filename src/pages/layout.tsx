import { Outlet, Link } from "react-router";
import LogoSvg from "../assets/icons/logo.svg?react";
import { NavLink } from "../components/NavLink";
import { Button } from "../components/Button";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-400">
      <header className="mx-auto flex w-full max-w-[1185px] items-center justify-between py-2">
        <LogoSvg />
        <nav className="flex items-center gap-4">
          <NavLink to="/" isActive>
            Solicitações de reembolso
          </NavLink>
          <Link to="/novo">
            <Button>Nova solicitação</Button>
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
