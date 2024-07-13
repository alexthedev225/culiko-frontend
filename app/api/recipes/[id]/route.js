import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fonction pour récupérer une recette par ID
export async function GET(req, { params }) {
  const { id } = params;
  console.log(`Received request for recipe with ID: ${id}`); // Ajout du log

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
    });

    if (!recipe) {
      console.log(`Recipe not found for ID: ${id}`); // Log si la recette n'est pas trouvée
      return NextResponse.json({ status: 'fail', message: 'Recette non trouvée' }, { status: 404 });
    }

    console.log(`Recipe found:`, recipe); // Log si la recette est trouvée
    return NextResponse.json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe: ${error.message}`); // Log d'erreur
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
        ingredients: JSON.stringify(JSON.parse(formData.get('ingredients')) || JSON.parse(recipe.ingredients)),
        instructions: JSON.stringify(JSON.parse(formData.get('instructions')) || JSON.parse(recipe.instructions)),
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
