import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <p>header / navbar</p>
      <Outlet />
      <p>footer</p>
    </div>
  );
}
