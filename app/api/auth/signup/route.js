import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Le nom d'utilisateur est déjà pris" },
        { status: 409 }
      );
    }

    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "USER", // Définir explicitement le rôle USER
      },
    });

    // Réponse avec les données de l'utilisateur, sans le mot de passe
    const userData = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
