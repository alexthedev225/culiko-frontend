// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assure-toi d'avoir configuré ton fichier prisma

export async function GET() {
  try {
    // Statistiques Clés
    const totalRecipes = await prisma.recipe.count();
    const totalUsers = await prisma.user.count();

    // Nombre de commentaires en attente (Ajoute un champ 'status' si nécessaire)
    const pendingComments = 0; // Si tu utilises un modèle pour les commentaires, modifie cette ligne

    // Recettes les plus populaires (à adapter selon ta logique métier)
    const popularRecipes = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Répartition des recettes par catégorie
    const recipesByCategory = await prisma.recipe.groupBy({
      by: ["category"],
      _count: { category: true },
    });

    const formattedCategories = recipesByCategory.map((item) => ({
      category: item.category,
      value: item._count.category,
    }));

    return NextResponse.json({
      stats: { totalRecipes, totalUsers, pendingComments },
      popularRecipes,
      recipesByCategory: formattedCategories,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
