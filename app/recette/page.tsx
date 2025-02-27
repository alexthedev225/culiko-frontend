import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import RecipeGrid from '@/components/RecipeGrid';

interface Recipe {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imagePath?: string;
  calories?: number;
  diet?: string;
}

const fetchPosts = async (): Promise<Recipe[]> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const RecipePage = async () => {
  const recipes = await fetchPosts();
  const categories = ["Petit déjeuner", "Dessert", "Plats principaux", "Entrée"];
  const defaultImageUrl = '/defaultFood.jpg';

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-8 playfair-display text-pink-500">
        Recettes Culinaires
      </h1>

      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Toutes les recettes présentées ici sont générées par une intelligence artificielle.
        </AlertDescription>
      </Alert>

      <RecipeGrid 
        recipes={recipes}
        categories={categories}
        defaultImageUrl={defaultImageUrl}
      />
    </div>
  );
};

export default RecipePage;
