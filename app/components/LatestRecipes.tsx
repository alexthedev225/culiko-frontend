import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowRight } from "lucide-react";

type Recipe = {
  id: number;
  title: string;
  imagePath: string;
  excerpt: string;
  createdAt: string;
};

const fetchRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_VERCEL_URL}/api`;
  const res = await fetch(`${baseUrl}/recipes`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const LatestRecipesSection: React.FC = async () => {
  const data = await fetchRecipes();
  const sortedRecipes = data.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const selectedRecipes = sortedRecipes.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Nouveautés
          </Badge>
          <h2 className="text-4xl font-bold mb-4 playfair-display">
            Dernières Recettes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos toutes dernières créations culinaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <Image
                    src={recipe.imagePath}
                    alt={recipe.title}
                    fill
                    className="object-cover rounded-t-lg"
                    priority
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-pink-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(recipe.createdAt)}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-pink-500 transition-colors line-clamp-2">
                  {recipe.title}
                </CardTitle>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Ajoutée récemment</span>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="line-clamp-2">
                  {recipe.excerpt}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href={`/recette/${recipe.id}`} className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-pink-500 group-hover:text-white transition-all"
                  >
                    Découvrir la recette
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/recette">
            <Button size="lg">
              Voir toutes les recettes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestRecipesSection;
