import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/stores/auth-store";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "A nota é obrigatória",
  }),
  description: z.string({
    required_error: "A descrição é obrigatória",
  }),
});

export default function NewReview() {
  const { courseId } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isLoggedIn } = useAuthStore((state) => state);

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "É necessário estar logado para postar uma avaliação",
      });
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      const authToken = Cookies.get("auth-token");

      const response = await fetch(`${API_BASE_URL}/reviews/${courseId}`, {
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
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({
        title: "Avaliação registrada com sucesso!",
      });
      navigate(`/courses/${courseId}`);
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Erro ao registrar avaliação",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Layout>
      <div className="space-y-4 my-10 container w-full sm:w-[641px]">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Cadastro de nova avaliação
        </h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="rating">Nota</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma nota" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Publicar avaliação"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
