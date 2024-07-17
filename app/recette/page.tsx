import React from 'react';
import BlogPost from '../components/BlogPost';

interface Recipe {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imagePath?: string;
  calories?: number;
  diet?: string;
}

const fetchPosts = async (): Promise<Recipe[]> => {
  const baseUrl = `${process.env.API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const Blog: React.FC = async () => {
  const recipes = await fetchPosts();
  const categories = ["Petit déjeuner", "Dessert", "Plats principaux", "Entrée"];
  const defaultImageUrl = '/defaultFood.jpg'; // URL de l'image par défaut

  return (
    <div className="py-12 ">
      <div className="flex flex-col container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-12 playfair-display text-pink-500">Recette</h1>
        
        {/* Avertissement moderne */}
        <div className="bg-pink-100 border-l-4 border-pink-500 text-pink-700 p-4 mb-12 rounded-md shadow-md">
          <p className="font-semibold">
            Avertissement : Toutes les recettes présentées ici sont générées par une intelligence artificielle.
          </p>
        </div>

        {/* Affichage des recettes par catégorie */}
        {categories.map((category, index) => (
          <div key={index} className="mb-12">
            <h3 className="text-3xl font-semibold mb-6 mt-8 playfair-display">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {recipes
                .filter((recipe) => recipe.category === category)
                .map((recipe) => (
                  <BlogPost
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.imagePath || defaultImageUrl}
                    calories={recipe.calories}
                    diet={recipe.diet}
                    excerpt={recipe.excerpt}
                    slug={recipe.id} // Utilisez l'ID comme slug
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
