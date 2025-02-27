'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, categories, defaultImageUrl }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedCalorieRange, setSelectedCalorieRange] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const dietOptions = [
    { label: 'Tous les régimes', value: 'all' },
    { label: 'Végétarien', value: 'vegetarian' },
    { label: 'Végan', value: 'vegan' },
    { label: 'Sans gluten', value: 'gluten-free' },
    { label: 'Équilibré', value: 'balanced' }
  ];

  const calorieRanges = [
    { label: 'Toutes les calories', value: 'all' },
    { label: 'Moins de 300 calories', value: 'low' },
    { label: '300-600 calories', value: 'medium' },
    { label: 'Plus de 600 calories', value: 'high' }
  ];

  const filterRecipes = (recipes: Recipe[]) => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDiet = selectedDiet === 'all' || 
        (recipe.diet?.toLowerCase() === dietOptions.find(d => d.value === selectedDiet)?.value);
      
      let matchesCalories = true;
      if (selectedCalorieRange !== 'all' && recipe.calories) {
        switch (selectedCalorieRange) {
          case 'low':
            matchesCalories = recipe.calories < 300;
            break;
          case 'medium':
            matchesCalories = recipe.calories >= 300 && recipe.calories <= 600;
            break;
          case 'high':
            matchesCalories = recipe.calories > 600;
            break;
        }
      }

      return matchesSearch && matchesDiet && matchesCalories;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Rechercher une recette..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedDiet} onValueChange={setSelectedDiet}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filtrer par régime" />
          </SelectTrigger>
          <SelectContent>
            {dietOptions.map((diet) => (
              <SelectItem key={diet.value} value={diet.value}>
                {diet.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCalorieRange} onValueChange={setSelectedCalorieRange}>
          <SelectTrigger className="md:w-1/4">
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

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full justify-start mb-6 overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-lg">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterRecipes(recipes)
                .filter((recipe) => recipe.category === category)
                .map((recipe) => (
                  <Card 
                    key={recipe.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={recipe.imagePath || defaultImageUrl}
                        alt={recipe.title}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-semibold">{recipe.title}</CardTitle>
                        {recipe.diet && (
                          <Badge variant="secondary" className="ml-2">
                            {recipe.diet}
                          </Badge>
                        )}
                      </div>
                      {recipe.calories && (
                        <Badge variant="outline" className="w-fit">
                          {recipe.calories} calories
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">
                        {recipe.excerpt}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">{selectedRecipe.title}</DialogTitle>
                <div className="flex gap-2 mt-2">
                  {selectedRecipe.diet && (
                    <Badge variant="secondary">{selectedRecipe.diet}</Badge>
                  )}
                  {selectedRecipe.calories && (
                    <Badge variant="outline">{selectedRecipe.calories} calories</Badge>
                  )}
                </div>
              </DialogHeader>
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={selectedRecipe.imagePath || defaultImageUrl}
                  alt={selectedRecipe.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <DialogDescription className="text-lg">
                {selectedRecipe.excerpt}
              </DialogDescription>
              <div className="mt-4">
                <Button onClick={() => setSelectedRecipe(null)}>Fermer</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeGrid;
