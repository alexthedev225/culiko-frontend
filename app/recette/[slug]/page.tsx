import Image from "next/image";
import { cookies } from 'next/headers'

interface Post {
  title: string;
  excerpt: string;
  category: string;
  content: string;
  diet?: string;
  calories?: number;
  imagePath: string;
  ingredients: string;
  instructions: string;
}

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const fetchPost = async (slug: string): Promise<Post> => {
  const res = await fetch(`${process.env.API_VERCEL_URL}/api/recipes/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

const BlogDetail: React.FC<BlogDetailProps> = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const { slug } = params;

  const post = await fetchPost(slug);

  if (!post) {
    return <div>Loading...</div>;
  }

  const ingredients = JSON.parse(post.ingredients);
  const instructions = JSON.parse(post.instructions);

  const similarRecipes = [
    { title: "Crêpes au chocolat", slug: "crepes-au-chocolat" },
    { title: "Gaufres belges", slug: "gaufres-belges" },
    { title: "Pancakes moelleux", slug: "pancakes-moelleux" },
  ];

  return (
    <section className="py-12  min-h-screen">
      <div className="flex flex-col items-center container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-pink-500 mb-12 playfair-display">Détails de la Recette</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-80">
            <Image
              src={post.imagePath}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              priority
            />
          </div>
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 playfair-display">{post.title}</h1>
            <p className="text-gray-600 mb-6">{post.excerpt}</p>
            <div className="flex justify-between items-center mb-8">
              <span className="text-pink-500 font-semibold uppercase">{post.category}</span>
              <span className="text-gray-500">{post.calories ? `${post.calories} kcal` : "Non spécifié"}</span>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingrédients :</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="hover:text-gray-900 transition-colors duration-200">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions :</h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                {instructions.map((instruction: string, index: number) => (
                  <li key={index} className="hover:text-gray-900 transition-colors duration-200">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Informations nutritionnelles :</h2>
              <p className="text-gray-700">
                <span className="font-semibold">Calories :</span>{" "}
                {post.calories ? `${post.calories} kcal` : "Non spécifié"}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Régime alimentaire :</span>{" "}
                {post.diet ? post.diet : "Non spécifié"}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recettes similaires :</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {similarRecipes.map((recipe, index) => (
                  <li key={index} className="hover:text-gray-900 transition-colors duration-200">
                    <a href={`/blog/${recipe.slug}`} className="underline">
                      {recipe.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
