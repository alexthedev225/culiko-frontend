"use client"
import React, { useState } from "react";
import axios from "axios";

interface Recipe {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  recipe: {
    ingredients: string[];
    instructions: string[];
  };
  calories: string; // Vous pouvez aussi le changer en number si nécessaire
  diet: string;
  imagePath: File | null; // Typé comme un fichier ou null
}

const RecipeForm: React.FC = () => {
  const [recipeData, setRecipeData] = useState<Recipe>({
    title: "",
    excerpt: "",
    category: "",
    content: "",
    recipe: {
      ingredients: [],
      instructions: [],
    },
    calories: "",
    diet: "",
    imagePath: null,
  });

  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newInstruction, setNewInstruction] = useState<string>("");

  const categories = ["Petit déjeuner", "Dessert", "Plats principaux", "Entrée"];
  const dietOptions = ["Végétarien", "Végétalien", "Sans gluten", "Cétogène", "Autre"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files?: FileList };
  
    if (name === "imagePath") {
      const file = files?.[0] || null; // Récupérer le fichier ou null
      setRecipeData({
        ...recipeData,
        imagePath: file,
      });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };
  

  const handleAddItem = (type: "ingredients" | "instructions") => {
    if (type === "ingredients" && newIngredient.trim() !== "") {
      setRecipeData((prevData) => ({
        ...prevData,
        recipe: {
          ...prevData.recipe,
          ingredients: [...prevData.recipe.ingredients, newIngredient.trim()],
        },
      }));
      setNewIngredient("");
    } else if (type === "instructions" && newInstruction.trim() !== "") {
      setRecipeData((prevData) => ({
        ...prevData,
        recipe: {
          ...prevData.recipe,
          instructions: [...prevData.recipe.instructions, newInstruction.trim()],
        },
      }));
      setNewInstruction("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("excerpt", recipeData.excerpt);
    formData.append("category", recipeData.category);
    formData.append("content", recipeData.content);
    formData.append("ingredients", JSON.stringify(recipeData.recipe.ingredients));
    formData.append("instructions", JSON.stringify(recipeData.recipe.instructions));
    formData.append("calories", recipeData.calories);
    formData.append("diet", recipeData.diet);
    if (recipeData.imagePath) {
      formData.append("imagePath", recipeData.imagePath);
    }

    try {
      const response = await axios.post(`/api/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submitted Recipe Data:", response.data);
      setRecipeData({
        title: "",
        excerpt: "",
        category: "",
        content: "",
        recipe: {
          ingredients: [],
          instructions: [],
        },
        calories: "",
        diet: "",
        imagePath: null,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la recette :", error);
    }
  };

  const handleSelectCategory = (category: string) => {
    setRecipeData({
      ...recipeData,
      category,
    });
  };

  const handleSelectDiet = (diet: string) => {
    setRecipeData({
      ...recipeData,
      diet,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre et Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-base font-medium text-black">Titre</label>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-black">Résumé</label>
            <textarea
              name="excerpt"
              value={recipeData.excerpt}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Catégorie et Contenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-base font-medium text-black mb-2">Catégorie</label>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`bg-gray-300 text-sm text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    recipeData.category === category ? "bg-gray-400" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-black">Contenu</label>
            <textarea
              name="content"
              value={recipeData.content}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Ingrédients et Instructions */}
        <div>
          <label className="block text-sm font-medium text-black">Ingrédients</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="newIngredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Ajouter un ingrédient"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem("ingredients")}
              className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>
          {recipeData.recipe.ingredients.length > 0 && (
            <ul className="mt-2">
              {recipeData.recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Instructions</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="newInstruction"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Ajouter une instruction"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem("instructions")}
              className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>
          {recipeData.recipe.instructions.length > 0 && (
            <ol className="mt-2">
              {recipeData.recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-sm">{instruction}</li>
              ))}
            </ol>
          )}
        </div>

        {/* Calories et Régime Alimentaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Nombre de calories</label>
            <input
              type="number"
              name="calories"
              value={recipeData.calories}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-black mb-2">Régime alimentaire</label>
            <div className="flex flex-wrap gap-2">
              {dietOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectDiet(option)}
                  className={`bg-gray-300 text-sm text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    recipeData.diet === option ? "bg-gray-400" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Champ d'image */}
        <div>
          <label className="block text-sm font-medium text-black">Image</label>
          <input
            type="file"
            name="imagePath"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Bouton de Soumission */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
