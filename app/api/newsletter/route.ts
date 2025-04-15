import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Envoyer un email de confirmation
    await resend.emails.send({
      from: "Culiko <onboarding@resend.dev>",
      to: email,
      subject: "Bienvenue à la newsletter Culiko",
      html: `
        <h2>Merci de votre inscription !</h2>
        <p>Vous êtes maintenant inscrit à la newsletter de Culiko.</p>
        <p>Vous recevrez nos dernières recettes et actualités directement dans votre boîte mail.</p>
        <br/>
        <p>Cordialement,</p>
        <p>L'équipe Culiko</p>
      `,
    });

    return NextResponse.json(
      { message: "Inscription réussie" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
