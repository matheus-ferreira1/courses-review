import { Link } from "react-router-dom";

import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface EducatorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  educator: {
    id: string;
    name: string;
    description: string;
    imgUrl: string;
  };
}

export default function EducatorCard({
  educator,
  className,
}: EducatorCardProps) {
  return (
    <Link
      to={`/educators/${educator.id}`}
      key={educator.id}
      className={cn(className)}
    >
      <Card className="transition-all hover:border-primary hover:border hover:shadow-lg ">
        <CardContent className="flex items-center justify-center gap-4 p-4">
          <img
            src={educator.imgUrl}
            alt={`Imagem de perfil de ${educator.name}`}
            className="rounded-full size-20 object-cover"
          />
          <h2 className="font-bold truncate">{educator.name}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
