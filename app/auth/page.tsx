"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  role: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Vérification du rôle admin
  useEffect(() => {
    const role = Cookies.get("role");
    if (role !== "admin") {
      router.push("/auth/login"); // Redirige si pas admin
    }
  }, [router]);

  // Récupération des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
        const response = await fetch(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Impossible de charger les utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  // Promotion / Rétrogradation
  const updateRole = async (userId: string, newRole: string) => {
    try {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
      const response = await fetch(`${baseUrl}/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du rôle");
      }

      // Met à jour localement
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      setError("Impossible de mettre à jour le rôle");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              {user.username} - {user.role}
            </span>
            <div>
              {user.role !== "admin" && (
                <button
                  onClick={() => updateRole(user.id, "admin")}
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Promouvoir
                </button>
              )}
              {user.role === "admin" && (
                <button
                  onClick={() => updateRole(user.id, "user")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Rétrograder
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
