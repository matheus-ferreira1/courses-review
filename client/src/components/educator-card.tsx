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
      <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
        <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
          <img
            src={educator.imgUrl}
            alt={`Imagem de perfil de ${educator.name}`}
            className="rounded-full size-24 object-cover"
          />
          <h2 className="font-bold">{educator.name}</h2>
          <p className="line-clamp-3 font-thin text-muted-foreground text-sm h-auto">
            {educator.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
