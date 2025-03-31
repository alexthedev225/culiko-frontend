"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/auth.service";
import AdminLayout from "../components/layouts/AdminLayout";
import LoadingScreen from "../components/LoadingScreen";

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
        router.replace("/auth/login");
        return;
      }
      setIsAuthorized(true);
    };
    
    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return <LoadingScreen />;
  }

  return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Bienvenue dans l&apos;interface d&apos;administration
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Guide rapide</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Consultez les statistiques dans le Dashboard</li>
              <li>• Gérez les utilisateurs et leurs permissions</li>
              <li>• Modérez les recettes et les commentaires</li>
              <li>• Configurez les paramètres du site</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Liens utiles</h2>
            <ul className="space-y-3 text-blue-600">
              <li>
                <a href="/admin/dashboard" className="hover:underline">
                  → Voir les statistiques
                </a>
              </li>
              <li>
                <a href="/admin/users" className="hover:underline">
                  → Gérer les utilisateurs
                </a>
              </li>
              <li>
                <a href="/admin/recipes" className="hover:underline">
                  → Gérer les recettes
                </a>
              </li>
              <li>
                <a href="/admin/settings" className="hover:underline">
                  → Configurer le site
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default AdminPage;
