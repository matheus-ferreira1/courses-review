import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import { useCreateEducator } from "@/services/useCreateEducator";

import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth-store";
import { useCookies } from "react-cookie";

export type NewEducatorFormTypes = {
  name: string;
  description: string;
  imgUrl?: string;
  authorId: string;
};

export default function NewEducator() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEducatorFormTypes>();

  /////////////////////////////////////////////////////////////////
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const useCreateEducator = async (formData: NewEducatorFormTypes) => {
    const authToken = cookies;
    console.log(`Bearer ${cookies}`);
    console.log(cookies);

    const response = await fetch(`${API_BASE_URL}/educators`, {
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
  };
  /////////////////////////////////////////////////////////////////

  const { mutate, isPending } = useMutation({
    mutationFn: useCreateEducator,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["educators"] });
      toast({
        title: "Educador registrado com sucesso!",
        description:
          "Agora você pode adicionar e avaliar cursos para este educador",
      });
      navigate("/educators");
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Erro ao registrar educador",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Layout>
      <div className="space-y-4 my-10 container w-full sm:w-[641px]">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Cadastro de novo educador
        </h1>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("name", { required: "Este campo é obrigatório" })}
          />
          {errors.name && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.name.message}
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
          <Label htmlFor="imgUrl">Link da imagem</Label>
          <Input
            type="text"
            id="imgUrl"
            className="border w-full py-1 px-2 font-normal -mt-3"
          />
          <Button disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
