import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  console.log("Received ID:", id); // Log pour vérifier l'ID reçu

  return NextResponse.json({ message: `Recipe ID is ${id}` });
}
