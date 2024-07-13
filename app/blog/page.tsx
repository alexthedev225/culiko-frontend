"use client";

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BlogPost from '../components/BlogPost';

const fetchRecipes = async () => {
  const response = await axios.get('/api/recipes');
  return response.data;
};

const Blog: React.FC = () => {
  const { data: recipes, error, isLoading } = useQuery('recipes', fetchRecipes);

  const categories = ["Petit déjeuner", "Dessert", "Plats principaux", "Entrée"];
  const defaultImageUrl = '/defaultFood.jpg'; // URL de l'image par défaut

  if (isLoading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur lors du chargement des données: {error.message}</p>;

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
                .map((recipe, index) => (
                  <BlogPost
                    key={index}
                    title={recipe.title}
                    image={recipe.imagePath || defaultImageUrl}
                    calories={recipe.calories}
                    diet={recipe.diet}
                    excerpt={recipe.excerpt}
                    slug={recipe.title} // Utilisez le titre ou un identifiant unique
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
