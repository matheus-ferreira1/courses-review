import { Link } from "react-router-dom";

import { Card, CardContent } from "./ui/card";

interface TopicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  topic: {
    id: string;
    name: string;
  };
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link to={`/topics/${topic.id}`} key={topic.id} className="size-auto">
      <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
        <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
          <h2 className="font-bold">{topic.name}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
