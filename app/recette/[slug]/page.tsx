import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, Users, ChefHat, Printer, Share2, Bookmark, Star, ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BackButton from '@/components/BackButton';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  diet?: string;
  calories?: number;
  imagePath: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  servings: number;
  difficulty: string;
}

async function getRecipe(id: string): Promise<Post> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch recipe');
  }
 
  return res.json();
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipe(params.slug);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <BackButton />
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>

        {/* En-tête de la recette */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{recipe.category}</Badge>
              <Badge variant="outline" className="text-yellow-600">
                <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                4.5 (128 avis)
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 playfair-display">
              {recipe.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {recipe.excerpt}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>Préparation: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{recipe.servings} personnes</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>Difficulté: {recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button>
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline">
                <Bookmark className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>

          {/* Image de la recette */}
          <Card className="mb-12">
            <CardContent className="p-0">
              <AspectRatio ratio={16/9}>
                <Image
                  src={recipe.imagePath}
                  alt={recipe.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </AspectRatio>
            </CardContent>
          </Card>

          {/* Ingrédients et Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingrédients */}
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
                <Separator className="mb-4" />
                <Table>
                  <TableBody>
                    {JSON.parse(recipe.ingredients).map((ingredient: string, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="py-2">{ingredient}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <Separator className="mb-4" />
                <ol className="space-y-6">
                  {JSON.parse(recipe.instructions).map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
