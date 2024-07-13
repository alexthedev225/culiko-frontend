import React from 'react';
import RecipeForm from '@/app/components/RecipeForm';

const Page = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 playfair-display">Ajouter une nouvelle recette</h1>
        <div className="bg-white  rounded-lg border">
          <RecipeForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
