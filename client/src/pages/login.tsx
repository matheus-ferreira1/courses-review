import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { signInUser } from "@/services/api-client";

import LogoMain from "@/components/logo-main";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export type LoginFormTypes = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setUser, setToken } = useAuthStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormTypes>();

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
      setUser(data.responseUser);
      setToken(data.token);
      toast({
        title: "Login feito com sucesso!",
        description: "Publique já sua primeira review!",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Erro ao fazer login",
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
          <h1 className="text-2xl font-semibold tracking-tight">Faça login</h1>
          <p className="text-sm text-muted-foreground">
            Preencha seus dados para continuar!
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
            {isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Ainda não está cadastrado?{" "}
          <NavLink
            to="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Crie sua conta
          </NavLink>
        </p>
      </div>
    </main>
  );
}
