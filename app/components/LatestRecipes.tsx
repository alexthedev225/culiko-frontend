import React from 'react';
import Image from 'next/image';

type Recipe = {
  id: number;
  title: string;
  image: string;
  description: string;
};

const latestRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Poulet rôti aux herbes',
    image: '/recipes/recipe-1.jpg',
    description: 'Un délicieux poulet rôti aux herbes aromatiques, parfait pour un repas en famille.',
  },
  {
    id: 2,
    title: 'Salade fraîcheur estivale',
    image: '/recipes/recipe-2.jpg',
    description: 'Une salade colorée avec des légumes frais de saison et une vinaigrette légère.',
  },
  {
    id: 3,
    title: 'Tarte aux fraises maison',
    image: '/recipes/recipe-3.jpg',
    description: 'Une tarte aux fraises délicieusement sucrée avec une pâte croustillante faite maison.',
  },
];

const LatestRecipesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Dernières Recettes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {latestRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold mb-2 montserrat">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                </div>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300">
                  Découvrir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestRecipesSection;
