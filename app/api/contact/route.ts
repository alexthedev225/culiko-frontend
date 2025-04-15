import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validations
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Envoi du message à vous-même
    await resend.emails.send({
      from: "Culiko <onboarding@resend.dev>",
      to: "alexcode225@gmail.com",
      replyTo: email,
      subject: `Contact Culiko: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Envoi d'une confirmation à l'utilisateur
    await resend.emails.send({
      from: "Culiko <onboarding@resend.dev>",
      to: email,
      subject: "Confirmation de votre message - Culiko",
      html: `
        <h2>Merci de nous avoir contacté !</h2>
        <p>Bonjour ${name},</p>
        <p>Nous avons bien reçu votre message concernant "${subject}".</p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
        <br/>
        <p>Cordialement,</p>
        <p>L'équipe Culiko</p>
      `,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur d'envoi:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'envoi du message",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
