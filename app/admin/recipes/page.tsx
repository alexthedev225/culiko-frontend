"use client";

import { useState, useEffect } from "react";
import router from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader } from "@/components/ui/loader";
import Cookies from "js-cookie";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft";
  createdAt: Date | string; // Mise à jour du type pour accepter string ou Date
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des recettes");
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) return;

    try {
      const token = Cookies.get("token");
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        router.push("/auth/login");
        return;
      }

      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la suppression"
      );
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recettes</h1>
          <p className="text-sm text-gray-500">
            Gérez les recettes de la plateforme
          </p>
        </div>
        <Link href="/admin/recipes/new" className="flex items-center gap-2">
          
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Ajouter une recette
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>{recipe.category}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recipe.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {recipe.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </TableCell>
                <TableCell>
                  {format(new Date(recipe.createdAt), "dd MMMM yyyy", {
                    locale: fr,
                  })}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      (window.location.href = `/recette/${recipe.id}`)
                    }
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      (window.location.href = `/admin/recipes/${recipe.id}/edit`)
                    }
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
