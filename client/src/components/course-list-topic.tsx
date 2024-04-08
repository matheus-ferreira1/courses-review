import { useQuery } from "@tanstack/react-query";

import Skeleton from "./skeleton";
import CourseCard from "./course-card";
import { useGetCoursesByTopic } from "@/services/useGetCoursesByTopic";

interface CoursesListByTopicProps {
  topicId: string | undefined;
}

export default function CoursesListByTopic({
  topicId,
}: CoursesListByTopicProps) {
  const useQueryFn = () => useGetCoursesByTopic(topicId!);

  const {
    isPending,
    isError,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["coursesByTopic"],
    queryFn: useQueryFn,
  });

  if (isError) {
    return <div className="mx-auto">Erro ao carregar: {error.message}</div>;
  }

  if (courses?.length === 0) {
    return <div>Não há cursos para este tópico</div>;
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
