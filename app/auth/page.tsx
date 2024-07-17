"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';
import Logout from '../components/Logout';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const response = await fetch(`${process.env.API_VERCEL_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message || 'Erreur lors de la connexion');
    } else {
      const data = await response.json();

      // Stockage des informations de l'utilisateur dans des cookies séparés
      Cookies.set('token', data.token, { expires: 7 }); // Token
      Cookies.set('username', data.user.username, { expires: 7 }); // Nom d'utilisateur
      Cookies.set('role', data.user.role, { expires: 7 }); // Rôle de l'utilisateur

      console.log('Connexion réussie', data);
      // Rediriger ou effectuer d'autres actions après la connexion
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Se connecter</button>
      </form>
      <Logout />
    </>
  );
};

export default LoginForm;
