import React from "react";
import PopularRecipes from "./components/PopularRecipes";
import Testimonial from "./components/Testimonial";
import LatestRecipesSection from "./components/LatestRecipes";
import RecipeCategories from "./components/RecipeCategories";

const Page = () => {
  return (
    <div>
      <div className="py-8 bg-gradient-to-r from-blue-500 to-pink-500">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-5xl font-bold text-white mb-4 playfair-display drop-shadow-lg">
      Bienvenue sur Culiko
    </h2>
    <p className="text-lg text-white bg-gray-800 bg-opacity-50 rounded-lg p-4">
      Découvrez une multitude de délices culinaires à savourer !
    </p>
  </div>
</div>

      <PopularRecipes />
      <RecipeCategories />
      <LatestRecipesSection />
      <Testimonial />
    </div>
  );
};

export default Page;
