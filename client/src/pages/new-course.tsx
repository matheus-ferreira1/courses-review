import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";

import { Educator } from "@/types/educator";
import { cn } from "@/lib/utils";

import Layout from "@/components/layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";

export type NewCourseFormTypes = {
  title: string;
  description: string;
  price: number;
  educatorName: string;
  topicName: string;
  tags: string;
};

export default function NewCourse() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["auth-token"]);
  const { toast } = useToast();

  const [educatorSearchTerm, setEducatorSearchTerm] = useState<string>("");
  const [educatorSearchResults, setEducatorSearchResults] = useState<
    Educator[] | []
  >([]);

  const debouncedEducatorSearch = useRef(
    debounce(async (searchTerm: string) => {
      const response = await fetch(
        `${API_BASE_URL}/educators/findByName/${searchTerm}`
      );
      const data = await response.json();

      setEducatorSearchResults(data);
    }, 1000)
  ).current;

  const handleEducatorSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEducatorSearchTerm(e.target.value);

    debouncedEducatorSearch(educatorSearchTerm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCourseFormTypes>();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: NewCourseFormTypes) => {
      const authToken = cookies["auth-token"];

      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        title: "Curso registrado com sucesso!",
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Erro ao registrar curso",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
    console.log(data);
  });

  return (
    <Layout>
      <div className="space-y-4 my-10 container w-full sm:w-[641px]">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Cadastro de novo curso
        </h1>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <Label htmlFor="title">Título</Label>
          <Input
            type="text"
            id="title"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("title", { required: "Este campo é obrigatório" })}
          />
          {errors.title && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.title.message}
            </span>
          )}

          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("description", {
              required: "Este campo é obrigatório",
            })}
          />
          {errors.description && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.description.message}
            </span>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <Label htmlFor="price">Preço</Label>
              <Input
                type="number"
                id="price"
                step="0.01"
                className="border w-full py-1 px-2 font-normal"
                {...register("price", { required: "Este campo é obrigatório" })}
              />
              {errors.price && (
                <span className="text-red-500 -mt-5 font-bold">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="topicName">Tópico</Label>
              <Input
                type="text"
                id="topicName"
                className="border w-full py-1 px-2 font-normal"
                {...register("topicName", {
                  required: "Este campo é obrigatório",
                })}
              />
              {errors.topicName && (
                <span className="text-red-500 -mt-5 font-bold">
                  {errors.topicName.message}
                </span>
              )}
            </div>
          </div>

          <Label htmlFor="educatorName">Autor</Label>
          <Popover
            open={educatorSearchResults.length > 0}
            onOpenChange={() => {
              setEducatorSearchResults([]);
            }}
          >
            <PopoverTrigger asChild>
              <Input
                type="text"
                id="educatorName"
                className="border w-full py-1 px-2 font-normal -mt-3"
                value={educatorSearchTerm}
                {...register("educatorName", {
                  required: "Este campo é obrigatório",
                })}
                onChange={handleEducatorSearch}
              />
            </PopoverTrigger>
            <PopoverContent>
              {educatorSearchResults.map((educator) => (
                <Close
                  onClick={() => setEducatorSearchTerm(educator.name)}
                  className={cn("w-full", buttonVariants({ variant: "ghost" }))}
                  key={educator.id}
                >
                  {educator.name}
                </Close>
              ))}
            </PopoverContent>
          </Popover>
          {errors.educatorName && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.educatorName.message}
            </span>
          )}

          <Label htmlFor="tags">Tags</Label>
          <Input
            type="text"
            id="tags"
            placeholder="Insira as tags separadas por vírgula..."
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("tags", { required: "Este campo é obrigatório" })}
          />
          {errors.tags && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.tags.message}
            </span>
          )}

          <Button disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
