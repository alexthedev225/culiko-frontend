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
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_VERCEL_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";
    console.log('URL de récupération des recettes :', `${baseUrl}/api/recipes`);
    
    const res = await fetch(`${baseUrl}/api/recipes`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Statut de la réponse :', res.status);
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error('Détails de l\'erreur :', errorData);
      throw new Error(`Échec de la récupération des données : ${res.statusText}`);
    }
    
    const recipes = await res.json();
    console.log('Recettes récupérées :', recipes);
    
    return recipes;
  } catch (error) {
    console.error('Erreur de récupération des dernières recettes :', error);
    throw error;
  }
};

const formatDate = (dateString: string) => {
  try {
    // Si la date est invalide, retourner une date par défaut
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn('Date invalide, utilisation de la date actuelle :', dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date());
    }

    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Erreur de formatage de date :', error);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }
};

const LatestRecipesSection: React.FC = async () => {
  const data = await fetchRecipes();
  
  // Trier les recettes, en utilisant la date actuelle si invalide
  const sortedRecipes = data.sort((a, b) => {
    const dateA = new Date(a.createdAt || Date.now());
    const dateB = new Date(b.createdAt || Date.now());
    return dateB.getTime() - dateA.getTime();
  });
  
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
