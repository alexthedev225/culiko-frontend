import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, ChefHat } from "lucide-react";
import { getApiUrl } from "@/services/api.service";

type Recipe = {
  id: number;
  title: string;
  imagePath: string;
  excerpt: string;
};

const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const baseUrl = getApiUrl();
    console.log("URL de récupération des recettes :", `${baseUrl}/api/recipes`);

    const res = await fetch(`${baseUrl}/api/recipes`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Statut de la réponse :", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Détails de l'erreur :", errorData);
      throw new Error(
        `Échec de la récupération des données : ${res.statusText}`
      );
    }

    const recipes = await res.json();
    console.log("Recettes récupérées :", recipes);

    return recipes;
  } catch (error) {
    console.error("Erreur de récupération des recettes populaires :", error);
    throw error;
  }
};

const PopularRecipes: React.FC = async () => {
  const data = await fetchRecipes();
  const shuffledRecipes = data.sort(() => 0.5 - Math.random());
  const selectedRecipes = shuffledRecipes.slice(0, 3);

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Les plus appréciées
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 playfair-display leading-tight">
            Recettes Populaires
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Découvrez nos recettes les plus appréciées par la communauté Culiko
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {selectedRecipes.map((recipe) => (
            <Link
              href={`/recette/${recipe.id}`}
              key={recipe.id}
              className="block w-full max-w-sm mx-auto"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={recipe.imagePath}
                      alt={recipe.title}
                      fill
                      className="object-cover rounded-t-lg"
                      priority
                    />
                  </AspectRatio>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors text-xs">
                      <Heart className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg md:text-xl group-hover:text-pink-500 transition-colors line-clamp-1">
                    {recipe.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="line-clamp-2 text-sm">
                    {recipe.excerpt}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  <Button className="w-full text-sm" variant="secondary">
                    Voir la recette
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/recette">
            <Button variant="outline" size="lg" className="text-sm">
              Voir toutes les recettes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
