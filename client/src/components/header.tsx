import { NavLink } from "react-router-dom";

import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/stores/auth-store";
import LogoMain from "./logo-main";
import UserNav from "./user-nav";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b py-3">
      <div className="container mx-auto flex justify-between items-center">
        <LogoMain />
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <ThemeToggle />
            </li>
            {isLoggedIn() ? (
              <>
                <li>
                  <NavLink to="/register">Nova review</NavLink>
                </li>
                <li>
                  <UserNav name={user?.name} email={user?.email} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Cadastre-se</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Entre</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
