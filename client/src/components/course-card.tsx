import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
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
          <h2 className="font-bold truncate">{course.title}</h2>
          <Separator />
          <p className="line-clamp-3 font-thin text-muted-foreground text-justify text-sm h-auto">
            {course.description}
          </p>
          <div className=" w-full mx-auto line-clamp-1">
            <div className="space-x-1">
              {course.tags.split(",").map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
