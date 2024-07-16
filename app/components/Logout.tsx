"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Supprimer le token des cookies
    Cookies.remove('token');
    Cookies.remove('role')
    // Rediriger vers la page de connexion
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
