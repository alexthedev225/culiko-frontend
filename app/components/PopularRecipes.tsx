import React from 'react';
import Image from 'next/image';

type Recipe = {
  title: string;
  image: string;
  link: string;
  description: string; // Ajout de la description
};

const recipes: Recipe[] = [
  { 
    title: 'Gâteau au Chocolat',
    image: '/chocolate-cake.jpg',
    link: '#',
    description: 'Un délicieux gâteau au chocolat fondant, parfait pour les amateurs de chocolat.',
  },
  { 
    title: 'Salade César',
    image: '/caesar-salad.jpg',
    link: '#',
    description: 'Une salade fraîche avec des croûtons croustillants, du poulet grillé et une vinaigrette crémeuse.',
  },
  { 
    title: 'Poulet au Curry',
    image: '/chicken-curry.jpg',
    link: '#',
    description: 'Un plat de poulet mijoté avec des épices savoureuses, idéal pour un dîner copieux.',
  },
];

const PopularRecipes: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Recettes Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold mb-2 montserrat">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                </div>
                <a href={recipe.link} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300">
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

export default PopularRecipes;
