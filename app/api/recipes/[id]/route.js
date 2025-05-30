import prisma from "@/lib/prisma";
import { verifyToken } from "@/middleware/verifyToken"; // Importez le middleware

// Fonction pour récupérer une recette par ID (accessible sans autorisation)
export async function GET(req, { params }) {
  const { id } = params;
  console.log(`Received request for recipe with ID: ${id}`);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: String(id) },
    });

    if (!recipe) {
      console.log(`Recipe not found for ID: ${id}`);
      return Response.json(
        { status: "fail", message: "Recette non trouvée" },
        { status: 404 }
      );
    }

    console.log(`Recipe found:`, recipe);
    return Response.json(recipe); // Les nouveaux champs seront inclus ici
  } catch (error) {
    console.error(`Error fetching recipe: ${error.message}`);
    return Response.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}

// Fonction pour mettre à jour une recette (nécessite une autorisation)
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const user = await verifyToken(req);
    if (!user) {
      return Response.json(
        { status: "fail", message: "Unauthorized" },
        { status: 403 }
      );
    }

    const data = await req.json();

    const recipe = await prisma.recipe.findUnique({
      where: { id: String(id) },
    });
    if (!recipe) {
      return Response.json(
        { status: "fail", message: "Recette non trouvée" },
        { status: 404 }
      );
    }

    // Mise à jour de la recette avec les nouveaux champs
    const updatedRecipe = await prisma.recipe.update({
      where: { id: String(id) },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        content: data.content,
        ingredients: data.ingredients,
        instructions: data.instructions,
        calories: data.calories,
        diet: data.diet,
        prepTime: data.prepTime, // Nouveau champ
        servings: data.servings, // Nouveau champ
        difficulty: data.difficulty, // Nouveau champ
      },
    });

    return Response.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error(`Error updating recipe: ${error.message}`);
    return Response.json(
      { status: "fail", message: error.message },
      { status: error.message === "Unauthorized" ? 403 : 500 }
    );
  }
}

// Fonction pour supprimer une recette (nécessite une autorisation)
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const user = await verifyToken(req);
    if (!user) {
      return Response.json(
        { status: "fail", message: "Unauthorized" },
        { status: 403 }
      );
    }

    const deletedRecipe = await prisma.recipe.delete({
      where: { id: String(id) },
    });
    return Response.json(deletedRecipe, { status: 200 });
  } catch (error) {
    console.error(`Error deleting recipe: ${error.message}`);
    return Response.json(
      { status: "fail", message: error.message },
      { status: error.message === "Unauthorized" ? 403 : 500 }
    );
  }
}
