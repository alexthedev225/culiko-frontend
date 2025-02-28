import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Coffee, Cake, UtensilsCrossed, Soup } from "lucide-react";

const categories = [
  {
    name: "Desserts",
    image: "/categories/dessert.jpg",
    icon: <Cake className="w-5 h-5" />,
    description: "Des douceurs pour tous les goûts",
    count: "25+ recettes",
    slug: "Dessert"
  },
  {
    name: "Plats principaux",
    image: "/categories/plat.jpg",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    description: "Des plats complets et savoureux",
    count: "30+ recettes",
    slug: "Plats principaux"
  },
  {
    name: "Entrées",
    image: "/categories/entree.jpg",
    icon: <Soup className="w-5 h-5" />,
    description: "Commencez en beauté",
    count: "20+ recettes",
    slug: "Entrée"
  },
  {
    name: "Petit déjeuner",
    image: "/categories/petit-dejeuner.jpg",
    icon: <Coffee className="w-5 h-5" />,
    description: "Pour bien commencer la journée",
    count: "15+ recettes",
    slug: "Petit déjeuner"
  }
];

const RecipeCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Explorez
          </Badge>
          <h2 className="text-4xl font-bold mb-4 playfair-display">
            Catégories de Recettes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Parcourez nos recettes par catégorie et trouvez l&apos;inspiration
            pour votre prochain repas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/recette?category=${category.slug}`}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </AspectRatio>
                </div>
                <CardHeader className="relative -mt-20 bg-gradient-to-t from-white via-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-pink-100 rounded-full text-pink-500">
                      {category.icon}
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-pink-500 transition-colors">
                    {category.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeCategories;
