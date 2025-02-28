import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/middleware/verifyToken'; // Vérification du token

export async function GET(req: Request) {
  try {
    const user = verifyToken(req); // Vérifier le token via middleware

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    // Récupérer tous les utilisateurs avec les champs créés et mis à jour
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,  // Ajouter ces champs
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
