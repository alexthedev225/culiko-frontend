import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/middleware/verifyToken'; // Vérification du token

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Récupérer l'ID de l'utilisateur
  const { role } = await req.json(); // Récupérer le rôle à attribuer

  try {
    const user = verifyToken(req); // Vérifier le token via middleware

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    // Mettre à jour le rôle de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: { role },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
