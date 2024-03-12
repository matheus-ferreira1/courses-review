import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { registerUser } from "@/services/api-client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import LogoMain from "@/components/logo-main";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";

export type RegisterFormTypes = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isLoggedIn } = useAuthStore((state) => state);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormTypes>();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Registrado com sucesso!",
        description: "Faça login para continuar",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <main>
      <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LogoMain className="mx-auto" />
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha seus dados para começar!
          </p>
        </div>
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
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("email", { required: "Este campo é obrigatório" })}
          />
          {errors.email && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.email.message}
            </span>
          )}
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            className="border w-full py-1 px-2 font-normal -mt-3"
            {...register("password", {
              required: "Este campo é obrigatório",
              minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 -mt-5 font-bold">
              {errors.password.message}
            </span>
          )}
          <Button disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
          </Button>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já possui uma conta?{" "}
          <NavLink
            to="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Faça login
          </NavLink>
        </p>
      </div>
    </main>
  );
}
