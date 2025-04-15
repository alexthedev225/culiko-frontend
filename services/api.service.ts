// services/api.service.ts

export const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_VERCEL_URL || "https://api.culiko.vercel.app";
  }
  return process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:3001";
};
