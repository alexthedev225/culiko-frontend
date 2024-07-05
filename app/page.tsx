import React from "react";
import PopularRecipes from "./components/PopularRecipes";
import Testimonial from "./components/Testimonial";
import LatestRecipesSection from "./components/LatestRecipes";
import RecipeCategories from "./components/RecipeCategories";

const Page = () => {
  return (
    <div>
      <PopularRecipes />
      <RecipeCategories />
      <LatestRecipesSection />
      <Testimonial />
    </div>
  );
};

export default Page;
