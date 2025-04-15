const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearRecipes() {
  try {
    console.log("🗑️ Suppression de toutes les recettes...");
    
    const deleteResult = await prisma.recipe.deleteMany({});
    
    console.log(`✅ ${deleteResult.count} recettes supprimées avec succès!`);
  } catch (error) {
    console.error("❌ Erreur lors de la suppression:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearRecipes()
  .catch((error) => {
    console.error("❌ Erreur fatale:", error);
    process.exit(1);
  });
