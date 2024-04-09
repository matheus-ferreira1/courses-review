import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/stores/auth-store";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export type NewTopicFormTypes = {
  name: string;
};

export default function NewTopic() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isLoggedIn } = useAuthStore((state) => state);

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "É necessário estar logado para acessar esta página",
      });
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate, toast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTopicFormTypes>();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: NewTopicFormTypes) => {
      const authToken = Cookies.get("auth-token");

      const response = await fetch(`${API_BASE_URL}/topics`, {
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
      await queryClient.invalidateQueries({ queryKey: ["topics"] });
      toast({
        title: "Tópico registrado com sucesso!",
      });
      navigate("/topics");
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Erro ao registrar tópico",
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
          Cadastro de novo tópico
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
          <Button disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
