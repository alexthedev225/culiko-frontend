"use client"
import React from 'react';
import Image from 'next/image';
import { Carousel, IconButton } from "@material-tailwind/react";

type Testimonial = {
  name: string;
  avatar: string;
  quote: string;
};

const TestimonialsSection: React.FC = () => {
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
    {
      name: 'Claire Lefevre',
      avatar: '/avatar4.png',
      quote: 'Culiko m\'a aidé à élargir mon répertoire culinaire avec des idées simples et innovantes.',
    },
    {
      name: 'Antoine Laurent',
      avatar: '/avatar5.png',
      quote: 'Je suis impressionné par la variété des recettes disponibles sur Culiko. Chaque plat est une nouvelle découverte!',
    },
    {
      name: 'Marie Durand',
      avatar: '/avatar6.png',
      quote: 'Les recettes de Culiko sont faciles à suivre et les résultats sont délicieux à chaque fois. Merci pour cette inspiration culinaire!',
    },
    {
      name: 'Lucas Bertrand',
      avatar: '/avatar7.png',
      quote: 'Je recommande Culiko à tous ceux qui veulent apprendre de nouvelles recettes sans complications. C\'est une véritable mine d\'or culinaire!',
    },
  ];
  

  return (
    <section className="py-12  bg-white">
      <div className="flex flex-col items-center container mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 playfair-display">Ce que disent nos clients</h2>
        <div className='h-[22rem] w-[35rem] '>
        <Carousel className="rounded-xl " responsive={[
          {
            breakpoint: 1024,
            options: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
          {
            breakpoint: 768,
            options: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          },
          {
            breakpoint: 640,
            options: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
        ]} 
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="blue"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="blue"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-blue-400" : "w-4 bg-blue-400/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 border border-gray-200 shadow-lg rounded-lg p-20 h-full w-full">
              <div className="flex items-center mb-4 ">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image src={testimonial.avatar} alt={testimonial.name} layout="responsive" width={48} height={48} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </Carousel>
      </div>
      </div>
    </section>
    
  );
};

export default TestimonialsSection;
