import { NavLink } from "react-router-dom";
import { BookOpenText } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoMainProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LogoMain({ className }: LogoMainProps) {
  return (
    <NavLink
      to="/"
      className={cn(
        "flex justify-between items-center gap-2 bg-primary text-primary-foreground py-2 px-4 font-bold",
        className
      )}
    >
      <BookOpenText />
      que curso?
    </NavLink>
  );
}
