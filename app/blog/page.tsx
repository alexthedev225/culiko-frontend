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
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
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
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-8 playfair-display">Blog</h2>

        {/* Affichage des recettes par catégorie */}
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-2xl font-semibold mb-4 mt-8 playfair-display">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
