import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fonction pour récupérer une recette par ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
    });

    if (!recipe) {
      return NextResponse.json({ status: 'fail', message: 'Recette non trouvée' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ status: 'fail', message: error.message }, { status: 500 });
  }
}

// Fonction pour mettre à jour une recette
export async function PUT(req, { params }) {
  const { id } = params;
  const formData = await req.formData();

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
    if (!recipe) {
      return NextResponse.json({ status: 'fail', message: 'Recette non trouvée' }, { status: 404 });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        title: formData.get('title') || recipe.title,
        excerpt: formData.get('excerpt') || recipe.excerpt,
        category: formData.get('category') || recipe.category,
        content: formData.get('content') || recipe.content,
        imagePath: formData.get('imagePath') || recipe.imagePath,
        ingredients: JSON.stringify(JSON.parse(formData.get('ingredients')) || JSON.parse(recipe.ingredients)),
        instructions: JSON.stringify(JSON.parse(formData.get('instructions')) || JSON.parse(recipe.instructions)),
        calories: formData.get('calories') ? Number(formData.get('calories')) : recipe.calories,
        diet: formData.get('diet') || recipe.diet,
      },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'fail', message: error.message }, { status: 500 });
  }
}

// Fonction pour supprimer une recette
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedRecipe, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'fail', message: error.message }, { status: 500 });
  }
}
