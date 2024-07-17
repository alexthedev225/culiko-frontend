import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma"; // Assurez-vous que le chemin est correct

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // chemin vers votre page de connexion personnalisée
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Vérifiez si l'utilisateur existe dans la base de données
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // Si l'utilisateur n'existe pas, créez un nouvel utilisateur
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            role: "USER", // Définissez le rôle par défaut
          },
        });
      }
      return true; // Retourne vrai pour autoriser la connexion
    },
    async jwt({ token, user, account }) {
      if (account && typeof account.access_token === 'string') {
        token.accessToken = account.access_token; // Type déjà assuré
      }

      // Récupérer le rôle de l'utilisateur et l'ajouter au token
      const existingUser = await prisma.user.findUnique({
        where: { email: token.email }, // Assurez-vous que le token a l'email
      });

      if (existingUser) {
        token.role = existingUser.role; // Ajoutez le rôle au token
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Assertion de type
      session.user.role = token.role; // Ajoutez le rôle à la session
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
});

// Exports nommés pour les méthodes HTTP
export const GET = (req, res) => handler(req, res);
export const POST = (req, res) => handler(req, res);
