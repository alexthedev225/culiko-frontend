"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Cookies from 'js-cookie';

const recipeSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().min(1, "La description courte est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  content: z.string().min(1, "Le contenu est requis"),
  diet: z.string().optional(),
  calories: z.number().optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [],
      instructions: [],
    },
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`);
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();

        form.reset({
          ...data,
          ingredients: JSON.parse(data.ingredients),
          instructions: JSON.parse(data.instructions),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id, form]);

  const onSubmit = async (data: z.infer<typeof recipeSchema>) => {
    setSaving(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.status === 403) {
        router.push('/auth/login');
        return;
      }

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
      router.push("/admin/recipes");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la sauvegarde"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Modifier la recette
        </h1>
        <p className="text-sm text-gray-500">
          Modifiez les informations de votre recette
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="starter">Entrée</SelectItem>
                      <SelectItem value="main">Plat principal</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description courte</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-[200px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            {/* Ingrédients */}
            <div className="space-y-4">
              <FormLabel>Ingrédients</FormLabel>
              {form.watch("ingredients").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    {...form.register(`ingredients.${index}`)}
                    placeholder="Ex: 200g de farine"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const ingredients = form.getValues("ingredients");
                      ingredients.splice(index, 1);
                      form.setValue("ingredients", ingredients);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const ingredients = form.getValues("ingredients");
                  form.setValue("ingredients", [...ingredients, ""]);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter un ingrédient
              </Button>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <FormLabel>Instructions</FormLabel>
              {form.watch("instructions").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    {...form.register(`instructions.${index}`)}
                    placeholder="Ex: Mélanger la farine et le sucre"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const instructions = form.getValues("instructions");
                      instructions.splice(index, 1);
                      form.setValue("instructions", instructions);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  const instructions = form.getValues("instructions");
                  form.setValue("instructions", [...instructions, ""]);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Ajouter une instruction
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/recipes")}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
