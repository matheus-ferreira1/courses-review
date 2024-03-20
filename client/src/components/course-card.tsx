import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`} key={course.id}>
      <Card className="transition-all hover:border-primary hover:border hover:shadow-lg">
        <CardContent className="flex flex-col aspect-square items-center justify-center p-4 space-y-4">
          <h2 className="font-bold">{course.title}</h2>
          <p className="line-clamp-3 font-thin text-muted-foreground text-sm h-auto">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
