import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Parece página que está buscando não existe... :(
      </h1>

      <Link className={buttonVariants()} to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
