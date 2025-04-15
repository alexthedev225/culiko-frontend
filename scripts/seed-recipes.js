const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sampleRecipes = [
  {
    title: "Smoothie Énergisant aux Fruits Tropicaux",
    content:
      "Ce smoothie énergisant aux fruits tropicaux est parfait pour un petit déjeuner sain et rapide...",
    category: "Petit déjeuner",
    excerpt:
      "Un smoothie rafraîchissant et énergisant rempli de fruits tropicaux pour bien démarrer votre journée.",
    diet: "Sans gluten",
    calories: 453,
    imagePath:
      "https://imgs.search.brave.com/O87j3RVH0vo3_DXjeyclXk3D8mJhyyohcBbNSSmorq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgy/NzQ0OTQzL2ZyL3Bo/b3RvL2J1cmdlci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/NWdpTTdkVUxlTTEz/WmxQWlZxMWs3ZXJo/dC1NQ2tVS1FzY1pF/UkJlOFcxQT0",
    ingredients: [
      "1 mangue, pelée et coupée en morceaux",
      "1 tasse d'ananas frais ou surgelé, coupé en morceaux",
      "1 banane",
      "1 tasse de lait de coco",
      "1 cuillère à soupe de graines de chia",
      "1 cuillère à café de miel (facultatif)",
      "Quelques glaçons (facultatif)",
    ],
    instructions: [
      "Préparer les fruits: Éplucher et couper la mangue en morceaux. Couper l'ananas en morceaux. Peler la banane.",
      "Mixer: Dans un mixeur, ajouter les morceaux de mangue, d'ananas et de banane. Ajouter le lait de coco et les graines de chia. Mixer jusqu'à obtenir une consistance lisse.",
      "Ajouter du miel: Si vous souhaitez un smoothie plus sucré, ajouter une cuillère à café de miel et mixer à nouveau.",
      "Servir: Verser le smoothie dans un grand verre. Ajouter quelques glaçons si désiré. Servir immédiatement.",
    ],
    prepTime: 10,
    servings: 2,
    difficulty: "facile",
    status: "published",
  },
];

async function seedRecipes() {
  try {
    console.log("🧹 Nettoyage de la base de données...");
    await prisma.recipe.deleteMany({});

    console.log("🌱 Début de l'insertion des recettes...");

    for (const recipe of sampleRecipes) {
      console.log("\nDonnées à insérer :", {
        title: recipe.title,
        prepTime: recipe.prepTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        ingredientsCount: recipe.ingredients.length,
        instructionsCount: recipe.instructions.length,
      });

      const createdRecipe = await prisma.recipe.create({
        data: recipe,
      });

      console.log("✅ Recette créée avec :", {
        id: createdRecipe.id,
        title: createdRecipe.title,
        prepTime: createdRecipe.prepTime,
        servings: createdRecipe.servings,
        difficulty: createdRecipe.difficulty,
        ingredientsCount: createdRecipe.ingredients.length,
        instructionsCount: createdRecipe.instructions.length,
      });
    }

    // Vérification
    const allRecipes = await prisma.recipe.findMany();
    console.log(
      "\n📊 Vérification des recettes insérées :",
      allRecipes.map((r) => ({
        id: r.id,
        title: r.title,
        prepTime: r.prepTime,
        servings: r.servings,
        difficulty: r.difficulty,
      }))
    );
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRecipes().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});
