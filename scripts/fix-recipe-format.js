const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fixRecipeFormat() {
  try {
    console.log("🔄 Début de la correction du format des recettes...");

    const recipes = await prisma.recipe.findMany();
    console.log(`📋 Trouvé ${recipes.length} recettes à traiter`);

    for (const recipe of recipes) {
      try {
        console.log(`\n📝 Traitement de la recette: ${recipe.title}`);
        console.log("Données actuelles:", {
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });

        // Nettoyer et reformater les données
        const cleanData = {
          ingredients: Array.isArray(recipe.ingredients)
            ? JSON.stringify(recipe.ingredients)
            : recipe.ingredients,
          instructions: Array.isArray(recipe.instructions)
            ? JSON.stringify(recipe.instructions)
            : recipe.instructions,
        };

        console.log("Données après nettoyage:", cleanData);

        // Mise à jour dans la base de données
        await prisma.recipe.update({
          where: { id: recipe.id },
          data: cleanData,
        });

        // Vérification après mise à jour
        const updatedRecipe = await prisma.recipe.findUnique({
          where: { id: recipe.id },
        });
        console.log("Données après mise à jour:", {
          ingredients: updatedRecipe.ingredients,
          instructions: updatedRecipe.instructions,
        });

        console.log(`✅ Recette mise à jour: ${recipe.title}`);
      } catch (error) {
        console.error(
          `❌ Erreur lors du traitement de la recette ${recipe.id}:`,
          error
        );
      }
    }

    console.log("\n✨ Correction terminée avec succès!");
  } catch (error) {
    console.error("❌ Erreur lors de la correction:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécution du script
fixRecipeFormat().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});
