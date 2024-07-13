import React from 'react';
import Link from 'next/link';

interface BlogPostProps {
  title: string;
  image: string | undefined; // Assurez-vous que image est typé comme une chaîne ou undefined
  excerpt: string;
  calories: string;
  diet: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, image, excerpt, calories, slug, diet }) => {

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <Link href={`/blog/${slug}`}>
        <div className="block">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-lg">
            <img src={image} alt="article image" className="object-cover w-full transition-opacity duration-300 transform hover:opacity-90" />
          </div>

          {/* Contenu textuel */}
          <div className="px-4 py-4">
            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {title} ({calories} calories, {diet})
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
