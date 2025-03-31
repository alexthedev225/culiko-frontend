"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Separator } from "../../../components/ui/separator";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ChefHat } from "lucide-react";
import { AuthService } from "@/app/services/auth.service";
import Cookies from "js-cookie";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Veuillez entrer votre nom d'utilisateur.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role === "ADMIN") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = await AuthService.login(values.username, values.password);

      if (data.user.role === "ADMIN") {
        toast.success("Connexion réussie !");
        router.push("/admin/dashboard");
      } else {
        toast.error("Accès non autorisé");
      }
    } catch (error) {
      toast.error("Identifiants invalides");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-t-4 border-red-500">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <ChefHat className="h-8 w-8 text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Administration Culiko
          </CardTitle>
          <CardDescription>
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <div className="text-red-600 font-medium mb-1">
                ⚠️ Accès restreint
              </div>
              <div className="text-red-500 text-sm">
                Cette interface est exclusivement réservée aux administrateurs
                de Culiko. Les connexions non autorisées seront signalées.
              </div>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Entrez votre nom d'utilisateur"
                          className="pl-10"
                          {...field}
                        />
                      </div>
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center">
          <Separator />
          <div className="text-sm">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
