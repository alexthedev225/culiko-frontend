import React from 'react';
import Image from 'next/image';

type Testimonial = {
  name: string;
  avatar: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Alice Martin',
    avatar: '/avatar1.png',
    quote: 'Les recettes sur Culiko sont vraiment délicieuses! J\'ai adoré chaque plat que j\'ai essayé.',
  },
  {
    name: 'Paul Dubois',
    avatar: '/avatar2.png',
    quote: 'Merci à Culiko pour m\'avoir permis de découvrir de nouvelles saveurs et recettes simples à réaliser!',
  },
  {
    name: 'Sophie Leroux',
    avatar: '/avatar3.png',
    quote: 'Les instructions sont claires et les résultats sont toujours à la hauteur de mes attentes. Je recommande Culiko à tous les amateurs de cuisine!',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Ce que disent nos clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 border border-gray-200 shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image src={testimonial.avatar} alt={testimonial.name} layout="responsive" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
