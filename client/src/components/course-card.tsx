import { Link } from "react-router-dom";

import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    tags: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`} key={course.id}>
      <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
        <CardContent className="p-5 space-y-2">
          <h2 className="font-semibold truncate">{course.title}</h2>
          <Separator />
          <p className="line-clamp-3 font-thin text-muted-foreground text-justify text-sm h-auto">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
