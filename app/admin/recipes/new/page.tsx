  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { useToast } from "@/components/ui/use-toast";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Loader2 } from "lucide-react";
  import Cookies from "js-cookie";

  interface Recipe {
    title: string;
    excerpt: string;
    category: string;
    content: string;
    ingredients: string[];
    instructions: string[];
    calories: number;
    diet: string;
    imagePath: File | null;
  }

  export default function NewRecipePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [recipeData, setRecipeData] = useState<Recipe>({
      title: "",
      excerpt: "",
      category: "",
      content: "",
      ingredients: [],
      instructions: [],
      calories: 0,
      diet: "",
      imagePath: null,
    });

    const [newIngredient, setNewIngredient] = useState("");
    const [newInstruction, setNewInstruction] = useState("");

    const handleAddItem = (type: "ingredients" | "instructions") => {
      if (type === "ingredients" && newIngredient.trim()) {
        setRecipeData((prev) => ({
          ...prev,
          ingredients: [...prev.ingredients, newIngredient.trim()],
        }));
        setNewIngredient("");
      } else if (type === "instructions" && newInstruction.trim()) {
        setRecipeData((prev) => ({
          ...prev,
          instructions: [...prev.instructions, newInstruction.trim()],
        }));
        setNewInstruction("");
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(recipeData).forEach(([key, value]) => {
        if (key === "ingredients" || key === "instructions") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "imagePath" && value) {
          formData.append(key, value);
        } else if (key === "calories") {
          formData.append(key, String(parseInt(String(value)) || 0));
        } else {
          formData.append(key, String(value));
        }
      });

      try {
        const token = Cookies.get("token");
        const response = await fetch("/api/recipes", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) throw new Error("Erreur lors de la création");

        toast({
          title: "Succès",
          description: "Recette créée avec succès",
        });

        router.push("/admin/recipes");
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de créer la recette",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setRecipeData((prev) => ({
            ...prev,
            imagePath: file,
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Nouvelle recette
          </h1>
          <p className="text-sm text-gray-500">
            Créez une nouvelle recette pour votre catalogue. Note : Cette
            plateforme est expérimentale et utilise l&apos;IA pour la génération
            de contenu culinaire.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={recipeData.title}
                onChange={(e) =>
                  setRecipeData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                name="category"
                value={recipeData.category}
                onValueChange={(value) =>
                  setRecipeData((prev) => ({ ...prev, category: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrée">Entrée</SelectItem>
                  <SelectItem value="Plats principaux">Plat</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Petit déjeuner">Petit déjeuner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet">Régime</Label>
              <Select
                name="diet"
                value={recipeData.diet}
                onValueChange={(value) =>
                  setRecipeData((prev) => ({ ...prev, diet: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un régime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Végétarien</SelectItem>
                  <SelectItem value="vegan">Végan</SelectItem>
                  <SelectItem value="glutenFree">Sans gluten</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                type="number"
                id="calories"
                name="calories"
                value={recipeData.calories}
                onChange={(e) =>
                  setRecipeData((prev) => ({
                    ...prev,
                    calories: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Résumé</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={recipeData.excerpt}
              onChange={(e) =>
                setRecipeData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              name="content"
              value={recipeData.content}
              onChange={(e) =>
                setRecipeData((prev) => ({ ...prev, content: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Nouvel ingrédient"
              />
              <Button
                type="button"
                onClick={() => handleAddItem("ingredients")}
              >
                Ajouter
              </Button>
            </div>
            <ul className="list-disc pl-5">
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                placeholder="Nouvelle instruction"
              />
              <Button
                type="button"
                onClick={() => handleAddItem("instructions")}
              >
                Ajouter
              </Button>
            </div>
            <ul className="list-decimal pl-5">
              {recipeData.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagePath">Image</Label>
            <Input
              id="imagePath"
              name="imagePath"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Prévisualisation"
                className="mt-2 max-w-xs rounded"
              />
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Créer la recette
            </Button>
          </div>
        </form>
      </div>
    );
  }
