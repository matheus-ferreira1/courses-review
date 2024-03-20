import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";

import { useGetTopicById } from "@/services/useGetTopicById";

import Layout from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CoursesListByTopic from "@/components/course-list-topic";

export default function TopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const {
    isPending,
    isError,
    data: topic,
    error,
  } = useQuery({
    queryKey: ["topic"],
    queryFn: () => useGetTopicById(topicId!!),
  });

  if (isError) {
    return (
      <div className="mx-auto">Erro ao carregar educador: {error.message}</div>
    );
  }

  if (isPending) {
    return <div className="mx-auto">Carregando...</div>;
  }

  return (
    <Layout>
      <div className="space-y-4 my-10 container">
        <button
          onClick={() => navigate(-1)}
          className={buttonVariants({ variant: "outline" })}
        >
          Voltar
        </button>

        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Exibindo cursos do tópico:{" "}
          <span className="underline uppercase tracking-wide">
            {topic?.name}
          </span>
        </h1>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Cursos</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/new-course"
          >
            <PlusCircle size={20} strokeWidth={1.5} className="mr-2" />
            Novo
          </Link>
        </div>
        <CoursesListByTopic topicId={topicId} />
      </div>
    </Layout>
  );
}
