import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function fixRecipeFormat() {
  try {
    console.log("🔄 Début de la correction du format des recettes...");

    const recipes = await prisma.recipe.findMany();
    console.log(`📋 Trouvé ${recipes.length} recettes à traiter`);

    for (const recipe of recipes) {
      try {
        let ingredients = "[]";
        let instructions = "[]";

        try {
          ingredients = recipe.ingredients
            ? JSON.stringify(JSON.parse(recipe.ingredients))
            : "[]";
        } catch (e) {
          console.warn(`⚠️ Erreur parsing ingredients pour ${recipe.id}`);
        }

        try {
          instructions = recipe.instructions
            ? JSON.stringify(JSON.parse(recipe.instructions))
            : "[]";
        } catch (e) {
          console.warn(`⚠️ Erreur parsing instructions pour ${recipe.id}`);
        }

        await prisma.recipe.update({
          where: { id: recipe.id },
          data: { ingredients, instructions },
        });

        console.log(`✅ Recette mise à jour: ${recipe.title}`);
      } catch (error) {
        console.error(
          `❌ Erreur lors du traitement de la recette ${recipe.id}:`,
          error
        );
      }
    }

    console.log("✨ Correction terminée avec succès!");
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
