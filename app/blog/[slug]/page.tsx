import React, { useState, useEffect } from "react";
import Image from "next/image";

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
  const baseUrl = `${process.env.API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const BlogDetail: React.FC<BlogDetailProps> = async ({ params }) => {
  const { slug } = params;
  const post = await fetchPost(slug);
  const ingredients = JSON.parse(post.ingredients);
  const instructions = JSON.parse(post.instructions);

  // Exemple de recommandations de recettes similaires
  const similarRecipes = [
    { title: "Crêpes au chocolat", slug: "crepes-au-chocolat" },
    { title: "Gaufres belges", slug: "gaufres-belges" },
    { title: "Pancakes moelleux", slug: "pancakes-moelleux" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 playfair-display text-gray-900">
          {post.title}
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.imagePath}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 transform hover:scale-105"
              priority
            />
          </div>

          <div className="bg-white p-10 rounded-lg shadow-xl border border-gray-300 transition-transform duration-300 hover:shadow-2xl">
            <p className="text-gray-800 text-lg mb-8 leading-relaxed">{post.content}</p>

            {/* Ingrédients */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
                Ingrédients :
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {ingredients.map((ingredient: string, index: number) => (
                  <li
                    key={index}
                    className="py-1 transition-colors duration-200 hover:text-gray-900"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
                Instructions :
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                {instructions.map((instruction: string, index: number) => (
                  <li
                    key={index}
                    className="py-1 transition-colors duration-200 hover:text-gray-900"
                  >
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Informations nutritionnelles */}
            <div className="mt-8 border-t border-gray-300 pt-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
                Informations nutritionnelles :
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold">Calories :</span>{" "}
                {post.calories ? `${post.calories} kcal` : "Non spécifié"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Régime alimentaire :</span>{" "}
                {post.diet ? post.diet : "Non spécifié"}
              </p>
            </div>

            {/* Recommandations de recettes similaires */}
            <div className="mt-8 border-t border-gray-300 pt-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
                Recettes similaires :
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {similarRecipes.map((recipe, index) => (
                  <li
                    key={index}
                    className="py-1 transition-colors duration-200 hover:text-gray-900"
                  >
                    <a href={`/blog/${recipe.slug}`} className="underline">
                      {recipe.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section de commentaires */}
            <div className="mt-8 border-t border-gray-300 pt-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
                Commentaires :
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">
                    <span className="font-semibold">Alice :</span> J&apos;ai adoré cette recette ! Les crêpes étaient parfaites.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">
                    <span className="font-semibold">Bob :</span> Facile à faire et délicieux. Merci pour la recette !
                  </p>
                </div>
                <form className="mt-6">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Laissez votre commentaire..."
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
