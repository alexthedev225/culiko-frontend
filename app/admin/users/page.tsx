"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react"; // Ajouter l'import du loader

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error("Erreur lors du chargement des utilisateurs");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast({
        title: "Succès",
        description: "Rôle mis à jour avec succès",
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;

    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-sm text-gray-500">
            Gérez les utilisateurs de la plateforme
          </p>
        </div>
      </div>

      <div className="border rounded-lg relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d&apos;utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Date d&apos;inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => updateUserRole(user.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "dd MMMM yyyy", {
                    locale: fr,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    onClick={() => deleteUser(user.id)}
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
