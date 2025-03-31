import React from "react";
import PopularRecipes from "./components/PopularRecipes";
import Testimonial from "./components/Testimonial";
import LatestRecipesSection from "./components/LatestRecipes";
import RecipeCategories from "./components/RecipeCategories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChefHat, Search, Utensils } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden bg-white">
  <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="  p-10">
      <ChefHat className="w-16 h-16 mx-auto mb-6 text-pink-500" />
      <h1 className="text-6xl font-bold text-gray-900 mb-6 playfair-display drop-shadow-md">
        Bienvenue sur Culiko
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
Découvrez une collection unique de recettes délicieuses, générées par une intelligence artificielle avancée, et laissez-vous guider vers une expérience culinaire extraordinaire.      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/recette">
          <Button size="lg" className="bg-pink-500 text-white hover:bg-pink-600 shadow-md">
            Explorer les recettes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/about">
          <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 shadow-md">
            En savoir plus
          </Button>
        </Link>
      </div>
    </div>
  </div>
</div>


      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">100+</div>
            <div className="text-gray-600">Recettes Uniques</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">4.8/5</div>
            <div className="text-gray-600">Note Moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">1000+</div>
            <div className="text-gray-600">Utilisateurs Satisfaits</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        <PopularRecipes />
        <RecipeCategories />
        <LatestRecipesSection />
        <Testimonial />
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 playfair-display">
      Prêt à commencer votre voyage culinaire ?
    </h2>
    <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
      Rejoignez notre communauté de passionnés de cuisine et découvrez de nouvelles saveurs chaque jour.
    </p>
    <Link href="/recette">
      <Button size="lg" className="bg-pink-500 text-white hover:bg-pink-600 transition duration-300">
        Découvrir toutes les recettes
        <Utensils className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  </div>
</div>

    </div>
  );
};

export default Page;
