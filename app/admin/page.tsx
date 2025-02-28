"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import AdminLayout from "../components/layouts/AdminLayout";

// Définir un type pour les utilisateurs
interface User {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null); // Ajout pour savoir quel utilisateur est en train de se mettre à jour
  const [roleChangePending, setRoleChangePending] = useState<string | null>(
    null
  ); // Etat pour gérer la mise à jour optimiste
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("token");

    if (!role || !token) {
      router.push("/");
    } else {
      setUserRole(role);
      if (role !== "ADMIN") {
        router.push("/");
      } else {
        const fetchUsers = async () => {
          try {
            const res = await fetch("/api/users", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (!res.ok) {
              throw new Error(
                "Erreur lors de la récupération des utilisateurs."
              );
            }

            const data: User[] = await res.json();
            setUsers(data);
            gsap.from(".user-row", {
              opacity: 0,
              stagger: 0.2,
              y: 30,
              duration: 1,
            });
          } catch (error) {
            console.error("Erreur de récupération des utilisateurs:", error);
            alert("Une erreur est survenue.");
          } finally {
            setLoading(false);
          }
        };

        fetchUsers();
      }
    }
  }, [router]);

  const handleRoleChange = async (
    userId: string,
    newRole: "USER" | "ADMIN"
  ) => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Mise à jour optimiste de l'interface
    setRoleChangePending(userId); // Déclenche la mise à jour immédiate
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );

    setUpdatingRole(userId); // Déclenche le spinner pour cet utilisateur

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la modification du rôle.");
      }

      const data = await res.json();

      // Réinitialiser le rôle dans l'état si nécessaire
      setRoleChangePending(null); // Effacer la mise à jour optimiste

      gsap.to(`.user-row-${userId}`, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
      });
      setTimeout(
        () => gsap.to(`.user-row-${userId}`, { scale: 1, duration: 0.3 }),
        300
      );
    } catch (error) {
      console.error("Erreur lors du changement de rôle:", error);
      alert("Une erreur est survenue.");

      // Si la requête échoue, réinitialiser le rôle à son état initial
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: user.role } : user
        )
      );
      setRoleChangePending(null); // Effacer la mise à jour optimiste
    } finally {
      setUpdatingRole(null); // Retirer le spinner après la mise à jour
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  }

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default AdminPage;
