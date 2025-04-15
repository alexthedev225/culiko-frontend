"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ChefHat } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imagePath?: string;
  calories?: number;
  diet?: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  categories: string[];
  defaultImageUrl: string;
  defaultCategory?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  categories,
  defaultImageUrl,
  defaultCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [selectedCalorieRange, setSelectedCalorieRange] =
    useState<string>("all");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (defaultCategory) {
      // Mise à jour de l'URL si nécessaire
      const params = new URLSearchParams(searchParams);
      params.set("category", defaultCategory);
      router.push(`/recette?${params.toString()}`);
    }
  }, [defaultCategory, router, searchParams]);

  const dietOptions = [
    { label: "Tous les régimes", value: "all" },
    { label: "Végétarien", value: "vegetarian" },
    { label: "Végan", value: "vegan" },
    { label: "Sans gluten", value: "gluten-free" },
    { label: "Équilibré", value: "balanced" },
  ];

  const calorieRanges = [
    { label: "Toutes les calories", value: "all" },
    { label: "Moins de 300 calories", value: "low" },
    { label: "300-600 calories", value: "medium" },
    { label: "Plus de 600 calories", value: "high" },
  ];

  const filterRecipes = (recipes: Recipe[]) => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiet =
        selectedDiet === "all" || recipe.diet === selectedDiet;

      let matchesCalories = true;
      if (selectedCalorieRange !== "all" && recipe.calories) {
        switch (selectedCalorieRange) {
          case "low":
            matchesCalories = recipe.calories < 300;
            break;
          case "medium":
            matchesCalories = recipe.calories >= 300 && recipe.calories <= 600;
            break;
          case "high":
            matchesCalories = recipe.calories > 600;
            break;
        }
      }

      return matchesSearch && matchesDiet && matchesCalories;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Rechercher une recette..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedDiet} onValueChange={setSelectedDiet}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrer par régime" />
          </SelectTrigger>
          <SelectContent>
            {dietOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedCalorieRange}
          onValueChange={setSelectedCalorieRange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrer par calories" />
          </SelectTrigger>
          <SelectContent>
            {calorieRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={defaultCategory || categories[0]}>
        <TabsList className="mb-4 flex flex-wrap h-auto gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4 py-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterRecipes(recipes)
                .filter((recipe) => recipe.category === category)
                .map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recette/${recipe.id}`}
                    className="block group h-full"
                  >
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col relative">
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={recipe.imagePath || defaultImageUrl}
                          alt={recipe.title}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute bottom-3 right-3">
                          <Badge
                            variant="secondary"
                            className="bg-white/95 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <ChefHat className="w-4 h-4 mr-1" />
                            Voir la recette
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="flex-none">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-3">
                            <CardTitle className="text-xl font-semibold group-hover:text-pink-600 transition-colors min-h-[56px]">
                              {recipe.title}
                            </CardTitle>
                            {recipe.diet && (
                              <Badge
                                variant="secondary"
                                className="whitespace-nowrap mt-1"
                              >
                                {recipe.diet}
                              </Badge>
                            )}
                          </div>
                          {recipe.calories && (
                            <Badge variant="outline" className="w-fit">
                              {recipe.calories} calories
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {recipe.excerpt}
                        </CardDescription>
                        <div className="mt-auto flex items-center text-sm text-pink-600 font-medium">
                          Voir les détails
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RecipeGrid;
