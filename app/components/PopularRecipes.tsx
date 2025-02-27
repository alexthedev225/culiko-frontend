import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, ChefHat } from "lucide-react";

type Recipe = {
  id: number;
  title: string;
  imagePath: string;
  excerpt: string;
};

const fetchRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const PopularRecipes: React.FC = async () => {
  const data = await fetchRecipes();
  const shuffledRecipes = data.sort(() => 0.5 - Math.random());
  const selectedRecipes = shuffledRecipes.slice(0, 3);

  return (
    <section className="py-16 bg-gradient-to-br from-white to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Les plus appréciées
          </Badge>
          <h2 className="text-4xl font-bold mb-4 playfair-display">
            Recettes Populaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos recettes les plus appréciées par la communauté Culiko
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedRecipes.map((recipe) => (
            <Card key={recipe.id} className="group hover:shadow-xl transition-all duration-300">
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
                  <Badge className="bg-white/90 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <Heart className="w-4 h-4 mr-1" />
                    Populaire
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-pink-500 transition-colors">
                  {recipe.title}
                </CardTitle>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    30 min
                  </span>
                  <span className="flex items-center">
                    <ChefHat className="w-4 h-4 mr-1" />
                    Facile
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="line-clamp-2">
                  {recipe.excerpt}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Link href={`/recette/${recipe.id}`} className="w-full">
                  <Button className="w-full" variant="secondary">
                    Voir la recette
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/recette">
            <Button variant="outline" size="lg">
              Voir toutes les recettes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
