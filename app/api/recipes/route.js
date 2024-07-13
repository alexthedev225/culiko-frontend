import { NextResponse } from 'next/server';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import prisma from '@/lib/prisma';

const pump = promisify(pipeline);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const category = formData.get('category');
    const content = formData.get('content');
    const calories = Number(formData.get('calories'));
    const diet = formData.get('diet');
    const ingredients = JSON.parse(formData.get('ingredients'));
    const instructions = JSON.parse(formData.get('instructions'));
    const file = formData.get('imagePath');

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
        calories,
        imagePath,
        ingredients: JSON.stringify(ingredients),
        instructions: JSON.stringify(instructions),
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (e) {
    return NextResponse.json({ status: "fail", message: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes);
  } catch (e) {
    return NextResponse.json({ status: "fail", message: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const { id } = req.query;
  const formData = await req.formData();

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
    if (!recipe) {
      return NextResponse.json({ status: "fail", message: "Recette non trouvée" }, { status: 404 });
    }

    const title = formData.get('title') || recipe.title;
    const excerpt = formData.get('excerpt') || recipe.excerpt;
    const category = formData.get('category') || recipe.category;
    const calories = Number(formData.get('calories'));
    const diet = formData.get('diet');
    const content = formData.get('content') || recipe.content;
    const ingredients = JSON.parse(formData.get('ingredients')) || JSON.parse(recipe.ingredients);
    const instructions = JSON.parse(formData.get('instructions')) || JSON.parse(recipe.instructions);
    const file = formData.get('imagePath');

    let imagePath = recipe.imagePath;

    if (file) {
      const filePath = `./public/uploads/${file.name}`;
      await pump(file.stream(), fs.createWriteStream(filePath));
      imagePath = `/uploads/${file.name}`;
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        title,
        excerpt,
        category,
        content,
        imagePath,
        calories,
        diet,
        ingredients: JSON.stringify(ingredients),
        instructions: JSON.stringify(instructions),
      },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (e) {
    return NextResponse.json({ status: "fail", message: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = req.query;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedRecipe, { status: 200 });
  } catch (e) {
    return NextResponse.json({ status: "fail", message: e.message }, { status: 500 });
  }
}
