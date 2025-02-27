"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Modifié pour utiliser directement "/api" sans l'URL de production
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Erreur lors de la connexion");
    } else {
      const data = await response.json();
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("username", data.user.username, { expires: 7 });
      Cookies.set("role", data.user.role, { expires: 7 });
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white p-2 rounded w-full hover:bg-pink-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
