import Image from 'next/image';
import Link from 'next/link';

const RecipeCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display ">Catégories de Recettes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-lg overflow-hidden border-b-pink-500 border-b-4">
            <div className="relative h-64">
              <Image
                src="/categories/dessert.jpg"
                alt="Desserts"
                layout="fill"
                objectFit="cover"
                className=""
                priority={true}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Desserts</h3>
              <Link href="/recette?category=Dessert" passHref>
                <div className="text-pink-500 hover:text-pink-600 font-medium">Voir les recettes</div>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg overflow-hidden border-b-pink-500 border-b-4">
            <div className="relative h-64">
              <Image
                src="/categories/plat.jpg"
                alt="Plats principaux"
                layout="fill"
                objectFit="cover"
                className=""
                priority={true}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Plats principaux</h3>
              <Link href="/recette?category=Plats principaux" passHref>
                <div className="text-pink-500 hover:text-pink-600 font-medium">Voir les recettes</div>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg overflow-hidden border-b-pink-500 border-b-4">
            <div className="relative h-64">
              <Image
                src="/categories/entree.jpg"
                alt="Entrées"
                layout="fill"
                objectFit="cover"
                className=""
                priority={true}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Entrées</h3>
              <Link href="/recette?category=Entrée" passHref>
                <div className="text-pink-500 hover:text-pink-600 font-medium">Voir les recettes</div>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg overflow-hidden border-b-pink-500 border-b-4">
            <div className="relative h-64">
              <Image
                src="/categories/petit-dejeuner.jpg"
                alt="Petit-déjeuner"
                layout="fill"
                objectFit="cover"
                className=""
                priority={true}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Petit-déjeuner</h3>
              <Link href="/recette?category=Petit déjeuner" passHref>
                <div className="text-pink-500 hover:text-pink-600 font-medium">Voir les recettes</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeCategories;
