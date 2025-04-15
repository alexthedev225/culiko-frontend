import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import RecipeGrid from "@/components/RecipeGrid";
import { getApiUrl } from "@/services/api.service";

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
  const baseUrl = `${getApiUrl()}/api`;
  const res = await fetch(`${baseUrl}/recipes`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const RecipePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const recipes = await fetchPosts();
  const categories = [
    "Petit déjeuner",
    "Dessert",
    "Plats principaux",
    "Entrée",
  ];
  const defaultImageUrl = "/defaultFood.jpg";

  const selectedCategory = searchParams.category as string;

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-8 playfair-display">
        Recettes Culinaires
      </h1>

      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Toutes les recettes présentées ici sont générées par une intelligence
          artificielle.
        </AlertDescription>
      </Alert>

      <RecipeGrid
        recipes={recipes}
        categories={categories}
        defaultImageUrl={defaultImageUrl}
        defaultCategory={selectedCategory}
      />
    </div>
  );
};

export default RecipePage;
