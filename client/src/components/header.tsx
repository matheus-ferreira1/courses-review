import { NavLink } from "react-router-dom";

import { ThemeToggle } from "./theme-toggle";
import LogoMain from "./logo-main";
import { useAuthStore } from "@/stores/auth-store";
import UserNav from "./user-nav";

export default function Header() {
  const isLogged = useAuthStore((state) => state.isLogged);
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
            {isLogged ? (
              <>
                <li>
                  <NavLink to="/register">Nova review</NavLink>
                </li>
                <li>
                  <UserNav
                    name={user?.responseUser.name}
                    email={user?.responseUser.email}
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
