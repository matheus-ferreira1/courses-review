import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useCookies } from "react-cookie";
import { Loader2 } from "lucide-react";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type NewCourseFormTypes = {
  title: string;
  description: string;
  price: number;
  educatorId: string;
  tags: string[];
};

export default function NewCourse() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["auth-token"]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
    // mutate(data);

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
          <Label htmlFor="price">Preço</Label>
          <Input
            type="number"
            id="price"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("price", { required: "Este campo é obrigatório" })}
          />
          {errors.price && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.price.message}
            </span>
          )}

          <Label htmlFor="educatorId" className="-mb-3">
            Autor
          </Label>
          <Controller
            name="educatorId"
            control={control}
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.educatorId && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.educatorId.message}
            </span>
          )}

          <Label htmlFor="tags">Tags</Label>
          <Controller
            name="tags"
            control={control}
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="tags"
                placeholder="Insira tags separadas por vírgula"
                className="border w-full py-1 px-2 font-normal -mt-3"
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
              />
            )}
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
