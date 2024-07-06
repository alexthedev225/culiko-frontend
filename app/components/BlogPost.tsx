// components/BlogPost.tsx
import Link from 'next/link';
import Image from 'next/image';

type BlogPostProps = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string; // Ajoutez la propriété slug
};

const BlogPost: React.FC<BlogPostProps> = ({ title, image, excerpt, date, slug }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="block rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition duration-300">
        <div className="relative h-60">
          <Image
            src={image || '/defaultFood.jpg'} // Utilisation de l'image par défaut si aucune image n'est spécifiée
            alt={title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{excerpt}</p>
          <p className="text-sm text-gray-500 mt-2">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
