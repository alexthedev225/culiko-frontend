import Image from 'next/image';

const RecipeCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Catégories de Recettes</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/categories/dessert.webp"
                alt="Desserts"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Desserts</h3>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Voir les recettes
              </a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/categories/plat.avif"
                alt="Plats principaux"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Plats principaux</h3>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Voir les recettes
              </a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/categories/entree.webp"
                alt="Entrées"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Entrées</h3>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Voir les recettes
              </a>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/categories/petit-dejeuner.avif"
                alt="Petit-déjeuner"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Petit-déjeuner</h3>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Voir les recettes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeCategories;
