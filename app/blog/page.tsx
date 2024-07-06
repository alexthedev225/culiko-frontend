'use client'
// app/blog/page.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import BlogPost from '../components/BlogPost';
import blogPosts from '../data/blogPosts.json';
import { BlogPostProps } from '../types/blogPostTypes';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ["Petit déjeuner", "Dessert", "Plats principaux", "Entrée"];
  const defaultImageUrl = '/default-image-url.jpg'; // Remplacez par l'URL de votre image par défaut

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchTerm.length === 0 || post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-8 playfair-display">Blog </h2>
        
        {/* Barre de recherche et filtres */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded-md mr-4"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {categories
          .filter((category) => !selectedCategory || selectedCategory === category)
          .map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold mb-4 mt-8 playfair-display">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredPosts
                  .filter((post) => post.category === category)
                  .map((post, index) => (
                    <BlogPost
                      key={index}
                      title={post.title}
                      image={post.image}
                      excerpt={post.excerpt}
                      date={post.date}
                      slug={post.slug} // Passer le slug ici
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
