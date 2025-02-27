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
      <div className="relative py-20 bg-gradient-to-r from-pink-500 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-6xl font-bold text-white mb-6 playfair-display drop-shadow-lg">
            Bienvenue sur Culiko
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Découvrez une collection unique de recettes délicieuses et laissez-vous guider vers une expérience culinaire extraordinaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recette">
              <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
                Explorer les recettes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                En savoir plus
              </Button>
            </Link>
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
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 playfair-display">
            Prêt à commencer votre voyage culinaire ?
          </h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de passionnés de cuisine et découvrez de nouvelles saveurs chaque jour.
          </p>
          <Link href="/recette">
            <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
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
