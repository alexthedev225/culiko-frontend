const nextConfig = {
  images: {
    domains: ['localhost', 'culiko.vercel.app'], // Ajoutez ici votre domaine déployé
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
