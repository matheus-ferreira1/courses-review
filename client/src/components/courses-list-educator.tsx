import { useQuery } from "@tanstack/react-query";

import { useGetCoursesByEducator } from "@/services/useGetCoursesByEducator";

import Skeleton from "./skeleton";
import CourseCard from "./course-card";

interface CoursesListByEducatorProps {
  educatorId: string | undefined;
}

export default function CoursesListByEducator({
  educatorId,
}: CoursesListByEducatorProps) {
  const useQueryFn = () => useGetCoursesByEducator(educatorId!);

  const {
    isPending,
    isError,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["coursesByEducator"],
    queryFn: useQueryFn,
  });

  if (isError) {
    return <div className="mx-auto">Erro ao carregar: {error.message}</div>;
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
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}
