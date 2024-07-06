import React from "react";
import PopularRecipes from "./components/PopularRecipes";
import Testimonial from "./components/Testimonial";
import LatestRecipesSection from "./components/LatestRecipes";
import RecipeCategories from "./components/RecipeCategories";

const Page = () => {
  return (
    <div>
      <div className=" py-8 border-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <h2 className="text-5xl font-bold text-black mb-4 playfair-display">
            Bienvenue sur Culiko
          </h2>
          <p className="text-lg text-gray-700">
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
