import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const recipes = selectedRecipes;

  return (
    <section className="py-12 bg-gradient-to-br from-white to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Recettes Populaires</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className=" bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={recipe.imagePath}
                  alt={recipe.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold mb-2 montserrat">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{recipe.excerpt}</p>
                </div>
                <Link
                  href={`/recette/${recipe.id}`}
                  key={recipe.id}
                  className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
