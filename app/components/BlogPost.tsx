import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostProps {
  title: string;
  image: string | undefined; // L'image peut être undefined
  excerpt: string;
  calories?: number; // Changer le type en number
  diet?: string; // Rendre diet optionnel
  id: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, image, excerpt, calories, id, diet }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <Link href={`/blog/${id}`}>
        <div className="block">
          {/* Image avec taille fixe */}
          <div className="relative overflow-hidden rounded-t-lg h-48"> {/* Ajustez la hauteur ici */}
            {image && (
              <Image
                src={image}
                alt="article image"
                layout="fill" // Remplit le conteneur
                objectFit="cover" // Couvre tout l'espace du conteneur
                className="transition-opacity duration-300 transform hover:opacity-90"
              />
            )}
          </div>

          {/* Contenu textuel */}
          <div className="px-4 py-4">
            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {title} {calories !== undefined ? `(${calories} calories)` : ''} {diet ? `(${diet})` : ''}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
