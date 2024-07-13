// next.config.mjs
const nextConfig = {
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
        destination: 'https://culiko.vercel.app/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
