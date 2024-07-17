"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";

import Cookies from "js-cookie";

interface Recipe {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  recipe: {
    ingredients: string[];
    instructions: string[];
  };
  calories: string;
  diet: string;
  imagePath: File | null;
}

const RecipeForm: React.FC<{ existingRecipe?: Recipe }> = ({
  existingRecipe,
}) => {
  const { data: session } = useSession();

  const token = Cookies.get("token");
  useEffect(() => {
    const role = Cookies.get("role");
    setIsAdmin(role === "ADMIN");
  }, []);
  const [recipeData, setRecipeData] = useState<Recipe>(
    existingRecipe || {
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
    }
  );

  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newInstruction, setNewInstruction] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const categories = [
    "Petit déjeuner",
    "Dessert",
    "Plats principaux",
    "Entrée",
  ];
  const dietOptions = [
    "Végétarien",
    "Végétalien",
    "Sans gluten",
    "Cétogène",
    "Autre",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files?: FileList;
    };
    if (name === "imagePath") {
      const file = files?.[0] || null;
      setRecipeData({ ...recipeData, imagePath: file });
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
          instructions: [
            ...prevData.recipe.instructions,
            newInstruction.trim(),
          ],
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
    formData.append(
      "ingredients",
      JSON.stringify(recipeData.recipe.ingredients)
    );
    formData.append(
      "instructions",
      JSON.stringify(recipeData.recipe.instructions)
    );
    formData.append("calories", recipeData.calories);
    formData.append("diet", recipeData.diet);
    if (recipeData.imagePath) {
      formData.append("imagePath", recipeData.imagePath);
    }

    try {
      const response = existingRecipe
        ? await axios.put(
            `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api/recipes/${existingRecipe.title}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.post(`${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api/recipes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

      console.log("Recipe Data:", response.data);
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
      console.error(
        "Erreur lors de la création ou de la mise à jour de la recette :",
        error
      );
    }
  };

  const handleDelete = async () => {
    if (!session) {
      signIn("google");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api/recipes/${existingRecipe?.title}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Recette supprimée !");
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
    }
  };

  const handleSelectCategory = (category: string) => {
    setRecipeData({ ...recipeData, category });
  };

  const handleSelectDiet = (diet: string) => {
    setRecipeData({ ...recipeData, diet });
  };
  {
    /* Avertissement moderne */
  }

  if (!isAdmin) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
        {" "}
        <p className="font-semibold">
         Attention : Accès non autorisé. Vous devez être un administrateur pour accéder à
          cette page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre et Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-base font-medium text-black">
              Titre
            </label>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-black">
              Résumé
            </label>
            <textarea
              name="excerpt"
              value={recipeData.excerpt}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* Catégorie et Contenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-base font-medium text-black mb-2">
              Catégorie
            </label>
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
            <label className="block text-base font-medium text-black">
              Contenu
            </label>
            <textarea
              name="content"
              value={recipeData.content}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* Ingrédients et Instructions */}
        <div>
          <label className="block text-sm font-medium text-black">
            Ingrédients
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="newIngredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Ajouter un ingrédient"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem("ingredients")}
              className="bg-pink-500 text-sm text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Ajouter
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {recipeData.recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-black">
            Instructions
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="newInstruction"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Ajouter une instruction"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              type="button"
              onClick={() => handleAddItem("instructions")}
              className="bg-pink-500 text-sm text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Ajouter
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {recipeData.recipe.instructions.map((instruction, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        {/* Calories et Régime */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label className="block text-base font-medium text-black">
              Calories
            </label>
            <input
              type="text"
              name="calories"
              value={recipeData.calories}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-400 border focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-black mb-2">
              Régime
            </label>
            <div className="flex flex-wrap gap-3">
              {dietOptions.map((diet, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectDiet(diet)}
                  className={`bg-gray-300 text-sm text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    recipeData.diet === diet ? "bg-gray-400" : ""
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-black">Image</label>
          <input
            type="file"
            name="imagePath"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>

        {/* Boutons de soumission et de suppression */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            {existingRecipe ? "Mettre à jour la recette" : "Créer la recette"}
          </button>
          {existingRecipe && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Supprimer la recette
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
