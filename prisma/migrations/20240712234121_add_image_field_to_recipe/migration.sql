-- DropIndex
DROP INDEX "RecipeDetail_recipeId_key";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN "imagePath" TEXT;
