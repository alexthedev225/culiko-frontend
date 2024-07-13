-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imagePath" TEXT,
    "ingredients" TEXT NOT NULL DEFAULT '[]',
    "instructions" TEXT NOT NULL DEFAULT '[]',
    "calories" INTEGER,
    "diet" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
