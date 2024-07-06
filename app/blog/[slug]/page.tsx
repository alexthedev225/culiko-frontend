"use client"
import Image from 'next/image';
import blogPosts from '../../data/blogPosts.json'; // Chemin vers votre fichier JSON de données de blog
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import de l'icône de flèche gauche de Heroicons


type BlogPost = {
    slug: string;
    title: string;
    image?: string;
    content: string;
    recipe: {
      ingredients: string[];
      instructions: string[];
    };
  };

  const defaultImage = '/defaultFood.jpg'; // Chemin vers votre image par défaut

const BlogDetail = ({ params }: { params: { slug: string } }) => {
    const navigation = useRouter(); // Utilisation de useNavigation au lieu de useRouter
 
    const handleGoBack = () => {
        navigation.back(); // Navigue vers la page précédente avec useNavigation
      };
    

  const  slug  = params.slug;
  const post: BlogPost | undefined = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return <p>Article non trouvé</p>; // Gestion du cas où l'article n'est pas trouvé
  }

  return (
    <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <button
          onClick={handleGoBack}
          className=" bg-black hover:bg-gray-900 transition-all ease-in-out 1s text-white py-2 px-4 rounded-lg flex items-center focus:outline-none z-10"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" /> Retour
        </button>
      <h1 className="text-3xl font-bold text-center mb-8 playfair-display">{post.title}</h1>
      <div className="max-w-4xl mx-auto">
      {post.image ? (
            <Image src={'/defaultFood.jpg'} alt={post.title} width={800} height={500} className="w-full h-96 object-cover mb-8" />
          ) : (
            <div className="w-full h-96 bg-gray-300 mb-8">
              <Image src={defaultImage} alt={post.title} layout="fill" objectFit="cover" />
            </div>
          )}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <p className="text-gray-700">{post.content}</p>

          {/* Affichage des ingrédients */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Ingrédients :</h2>
            <ul className="list-disc list-inside">
              {post.recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Affichage des instructions */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Instructions :</h2>
            <ol className="list-decimal list-inside">
              {post.recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default BlogDetail;
