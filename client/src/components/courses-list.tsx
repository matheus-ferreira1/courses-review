import { useGetCoursesByEducator } from "@/services/useGetCoursesByEducator";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./skeleton";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

interface CoursesListProps {
  educatorId: string | undefined;
}

export default function CoursesList({ educatorId }: CoursesListProps) {
  const {
    isPending,
    isError,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => useGetCoursesByEducator(educatorId!!),
  });

  if (isError) {
    return (
      <div className="mx-auto">Erro ao carregar educador: {error.message}</div>
    );
  }

  if (courses?.length === 0) {
    return <div>Não há cursos para este educador</div>;
  }

  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
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
          ))}
        </div>
      )}
    </>
  );
}
