import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useGetEducators } from "@/services/useGetEducators";
import { useGetTopics } from "@/services/useGetTopics";
import { useAuthStore } from "@/stores/auth-store";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number().gt(0),
  educatorName: z.string(),
  topicName: z.string(),
  tags: z.string(),
});

export default function NewCourse() {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      educatorName: "",
      topicName: "",
      tags: "",
    },
  });

  const educatorQuery = useQuery({
    queryKey: ["educators"],
    queryFn: useGetEducators,
  });

  const topicQuery = useQuery({
    queryKey: ["topics"],
    queryFn: useGetTopics,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      const authToken = Cookies.get("auth-token");

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Layout>
      <div className="space-y-4 my-10 container w-full sm:w-[641px]">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          Cadastro de novo curso
        </h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="price">Preço</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="topicName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="topicName">Tópico</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        disabled={topicQuery.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tópico" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topicQuery.data?.map((topic) => (
                            <SelectItem key={topic.id} value={topic.name}>
                              {topic.name}
                            </SelectItem>
                          ))}
                          <Separator />
                          <Link
                            to="/new-topic"
                            className="w-full text-sm hover:underline pl-8 leading-6"
                          >
                            Cadastrar novo tópico
                          </Link>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="educatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="educatorName">Autor</FormLabel>
                  <Select
                    disabled={educatorQuery.isPending}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um autor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educatorQuery.data?.map((educator) => (
                        <SelectItem key={educator.id} value={educator.name}>
                          {educator.name}
                        </SelectItem>
                      ))}
                      <Separator />
                      <Link
                        to="/new-educator"
                        className="w-full text-sm hover:underline pl-8 leading-6"
                      >
                        Cadastrar novo autor
                      </Link>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="tags">Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira as tags separadas por vírgula..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Cadastrar"}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
