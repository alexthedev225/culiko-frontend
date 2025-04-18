import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/middleware/verifyToken";

const pump = promisify(pipeline);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const category = formData.get("category");
    const content = formData.get("content");
    const calories = parseInt(formData.get("calories")) || null;
    const diet = formData.get("diet");
    const ingredients = formData.get("ingredients"); // Déjà un tableau
    const instructions = formData.get("instructions"); // Déjà un tableau
    const file = formData.get("imagePath");
    const prepTime = parseInt(formData.get("prepTime")) || 0;
    const servings = parseInt(formData.get("servings")) || 1;
    const difficulty = formData.get("difficulty") || "facile";

    let imagePath = null;

    if (file) {
      const filePath = `./public/uploads/${file.name}`;
      await pump(file.stream(), fs.createWriteStream(filePath));
      imagePath = `/uploads/${file.name}`;
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        excerpt,
        category,
        content,
        diet,
        calories, // Maintenant envoyé comme Int
        imagePath,
        ingredients, // Stocké directement comme tableau
        instructions, // Stocké directement comme tableau
        prepTime,
        servings,
        difficulty,
      },
    });

    return Response.json(newRecipe, { status: 201 });
  } catch (e) {
    console.error("Erreur détaillée lors de la création de la recette :", {
      message: e.message,
      code: e.code,
      stack: e.stack,
      name: e.name,
    });

    return Response.json(
      { status: "fail", message: e.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await prisma.$connect();

    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        imagePath: true,
        calories: true,
        category: true,
        createdAt: true,
      },
    });

    return Response.json(recipes, { status: 200 });
  } catch (e) {
    console.error("Erreur détaillée lors de la récupération des recettes :", {
      message: e.message,
      code: e.code,
      stack: e.stack,
      name: e.name,
    });

    // Gestion spécifique des erreurs de connexion
    if (e.code === "P1001") {
      return Response.json(
        {
          status: "fail",
          message:
            "Impossible de se connecter à la base de données. Vérifiez votre connexion réseau et les paramètres de la base de données.",
          error: e.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        status: "fail",
        message: "Impossible de récupérer les recettes",
        error: e.message,
      },
      { status: 500 }
    );
  } finally {
    // Toujours se déconnecter proprement
    await prisma.$disconnect();
  }
}

export async function PUT(req) {
  const user = await verifyToken(req);
  if (!user) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 403 }
    );
  }

  const { id } = req.query;
  const formData = await req.formData();

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: String(id) },
    });
    if (!recipe) {
      return Response.json(
        { status: "fail", message: "Recette non trouvée" },
        { status: 404 }
      );
    }

    const title = formData.get("title") || recipe.title;
    const excerpt = formData.get("excerpt") || recipe.excerpt;
    const category = formData.get("category") || recipe.category;
    const calories = parseInt(formData.get("calories")) || null;
    const diet = formData.get("diet");
    const content = formData.get("content") || recipe.content;
    const ingredients =
      formData.get("ingredients") || JSON.parse(recipe.ingredients); // Déjà un tableau
    const instructions =
      formData.get("instructions") || JSON.parse(recipe.instructions); // Déjà un tableau
    const file = formData.get("imagePath");

    let imagePath = recipe.imagePath;

    if (file) {
      const filePath = `./public/uploads/${file.name}`;
      await pump(file.stream(), fs.createWriteStream(filePath));
      imagePath = `/uploads/${file.name}`;
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: String(id) },
      data: {
        title,
        excerpt,
        category,
        content,
        imagePath,
        calories, // Maintenant envoyé comme Int
        diet,
        ingredients, // Stocké directement comme tableau
        instructions, // Stocké directement comme tableau
      },
    });

    return Response.json(updatedRecipe, { status: 200 });
  } catch (e) {
    console.error("Erreur détaillée lors de la mise à jour de la recette :", {
      message: e.message,
      code: e.code,
      stack: e.stack,
      name: e.name,
    });

    return Response.json(
      { status: "fail", message: e.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const user = await verifyToken(req);
  if (!user) {
    return Response.json(
      { status: "fail", message: "Unauthorized" },
      { status: 403 }
    );
  }

  const { id } = req.query;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: String(id) },
    });
    return Response.json(deletedRecipe, { status: 200 });
  } catch (e) {
    console.error("Erreur détaillée lors de la suppression de la recette :", {
      message: e.message,
      code: e.code,
      stack: e.stack,
      name: e.name,
    });

    return Response.json(
      { status: "fail", message: e.message },
      { status: 500 }
    );
  }
}
