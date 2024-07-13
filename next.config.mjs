// next.config.mjs
import { defineConfig } from 'next/config';

export default defineConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['culiko.vercel.app'], // Ajoutez ici les domaines autorisés pour les images
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL, // Exemple de variable d'environnement
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.culiko.vercel.app/:path*', // Proxy to Backend
      },
    ];
  },
});
