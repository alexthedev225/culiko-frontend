import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    // Comparaison du mot de passe hashé
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    // Créer un token JWT avec le rôle et les informations de l'utilisateur
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Formatage des données utilisateur pour ne pas exposer le mot de passe
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Réponse avec le token et les données de l'utilisateur
    return NextResponse.json({ token, user: userData });
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion:', error);
    return NextResponse.json({ error: 'Une erreur est survenue, veuillez réessayer plus tard' }, { status: 500 });
  }
}
