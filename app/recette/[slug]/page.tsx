"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import BackButton from "@/components/BackButton";
import { getApiUrl } from "@/services/api.service";

interface Recipe {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imagePath: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  servings: number;
  difficulty: string;
}

export default function RecipePage() {
  const params = useParams();
  const id = params?.slug;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const baseUrl = getApiUrl();
        const apiUrl = `${baseUrl}/api/recipes/${id}`;
        console.log("Fetching recipe from:", apiUrl);

        const res = await fetch(apiUrl, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error Response:", errorText);
          throw new Error(`Failed to fetch recipe: ${res.statusText}`);
        }

        const data = await res.json();
        if (!data) throw new Error("No data received");
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load recipe"
        );
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center mt-8">Chargement...</div>;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <BackButton />
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="space-y-6">
            <div className="space-y-4">
              <Badge className="w-fit">{recipe.category}</Badge>
              <CardTitle className="text-4xl font-bold playfair-display">
                {recipe.title}
              </CardTitle>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 mr-2" />
                <span>{recipe.prepTime} min</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="w-5 h-5 mr-2" />
                <span>{recipe.servings} portions</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {recipe.imagePath && (
              <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={recipe.imagePath}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <Separator />

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="md:col-span-1 bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Ingrédients
                  </CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                  <ul className="list-none space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Instructions</CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
