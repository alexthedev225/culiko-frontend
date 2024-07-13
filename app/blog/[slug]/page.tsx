"use client";

import React from 'react';
import { useQuery } from 'react-query';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';

interface Post {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  diet?: string;
  calories?: number;
  imagePath: string;
  ingredients: string;
  instructions: string;
}

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const fetchPost = async (slug: string): Promise<Post> => {
  const res = await fetch(`/api/recipes/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const BlogDetail: React.FC<BlogDetailProps> = ({ params }) => {
  const { slug } = params;

  const { data: post, isLoading, isError } = useQuery<Post, Error>(['post', slug], () => fetchPost(slug));

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700">Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Failed to load data. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500">Recette non trouvée.</p>
        </div>
      </section>
    );
  }

  const ingredients = JSON.parse(post.ingredients);
  const instructions = JSON.parse(post.instructions);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-center mb-8 playfair-display">{post.title}</h1>
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-gray-300 mb-8 relative rounded-lg overflow-hidden h-96"> {/* Ajustez la hauteur ici */}
            <Image
              src={post.imagePath}
              alt={post.title}
              layout="fill" // Remplit le conteneur
              objectFit="cover" // Couvre tout l'espace du conteneur
              className="transition-opacity duration-300 transform hover:opacity-90"
            />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-gray-700 text-lg">{post.content}</p>

            {/* Affichage des ingrédients */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Ingrédients :</h2>
              <ul className="list-disc list-inside">
                {ingredients.map((ingredient: string, index: number) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Affichage des instructions */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Instructions :</h2>
              <ol className="list-decimal list-inside space-y-3">
                {instructions.map((instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* Affichage des informations nutritionnelles */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Informations nutritionnelles :</h2>
              <p>
                <span className="font-semibold">Calories :</span> {post.calories ? `${post.calories} kcal` : 'Non spécifié'}
              </p>
              <p>
                <span className="font-semibold">Régime alimentaire :</span> {post.diet ? post.diet : 'Non spécifié'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
