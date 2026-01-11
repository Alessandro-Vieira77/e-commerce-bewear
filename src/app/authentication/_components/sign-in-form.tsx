"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { authClient } from "@/src/lib/auth-client";

const formSchema = z.object({
  email: z.email("Email inválido").trim(),
  password: z.string().min(8, "Senha deve ter pelo menos 6 caracteres"),
});

type formValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: formValues) => {
    console.log(value);
    await authClient.signIn.email({
      email: value?.email,
      password: value?.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Login realizado com sucesso");
          router.push("/");
        },
        onError: (ctx) => {
          console.log(ctx);
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Email ou senha inválidos");
            form.setError("email", {
              message: "Email ou senha inválidos",
            });
            form.setError("password", {
              message: "Email ou senha inválidos",
            });
            return;
          }
        },
      },
    });
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça login para acessar sua conta.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Digite seu email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Digite sua senha"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="button"
              onClick={handleSignInWithGoogle}
              variant="outline"
              className="w-full"
            >
              {form.formState.isSubmitting ? "Entrando..." : "Google"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
