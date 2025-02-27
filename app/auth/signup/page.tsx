"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";

const SignupForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
React.useEffect(() => {
  document.querySelector(".signup-form")?.classList.add("opacity-0");
  setTimeout(() => {
    document.querySelector(".signup-form")?.classList.remove("opacity-0");
    document.querySelector(".signup-form")?.classList.add("opacity-100");
  }, 50);
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Si l'inscription est réussie, on stocke le token et on redirige
        Cookies.set("token", data.token, { expires: 1 });
        setSuccess(true);
        router.push("/admin");
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Une erreur est survenue");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="signup-form w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {success && (
          <div className="flex items-center text-green-500 mb-4">
            <CheckCircleIcon className="h-6 w-6 mr-2" />
            <span>Inscription réussie !</span>
          </div>
        )}

        {error && (
          <div className="text-red-500 mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Se connecter
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
