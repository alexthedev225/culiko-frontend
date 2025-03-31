"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Alice Martin",
    avatar: "/avatar1.png",
    quote: "Les recettes sur Culiko sont vraiment délicieuses! J'ai adoré chaque plat que j'ai essayé.",
  },
  {
    name: "Paul Dubois",
    avatar: "/avatar2.png",
    quote: "Merci à Culiko pour m'avoir permis de découvrir de nouvelles saveurs et recettes simples à réaliser!",
  },
  {
    name: "Sophie Leroux",
    avatar: "/avatar3.png",
    quote: "Les instructions sont claires et les résultats sont toujours à la hauteur de mes attentes.",
  },
  {
    name: "Claire Lefevre",
    avatar: "/avatar4.png",
    quote: "Culiko m'a aidé à élargir mon répertoire culinaire avec des idées simples et innovantes.",
  },
  {
    name: "Antoine Laurent",
    avatar: "/avatar5.png",
    quote: "Impressionné par la variété des recettes disponibles. Chaque plat est une nouvelle découverte!",
  },
  {
    name: "Marie Durand",
    avatar: "/avatar6.png",
    quote: "Les recettes sont faciles à suivre et les résultats sont délicieux à chaque fois.",
  },
];

const TestimonialsSection = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-12 md:py-20 relative dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 playfair-display text-black">
          Ce que disent nos clients
        </h2>

        <div className="relative">
          <Carousel 
            className="max-w-[85vw] md:max-w-4xl mx-auto"
            plugins={[plugin.current]}
            opts={{
              loop: true,
              align: "center",
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-4/5 lg:basis-3/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="md:hover:shadow-2xl transition-all duration-500"
                  >
                    <Card className="relative overflow-hidden border-none bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl rounded-xl">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col items-center space-y-4 md:space-y-6">
                          <motion.div 
                            className="relative h-16 w-16 md:h-20 md:w-20"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="rounded-full object-cover ring-4 ring-pink-400 dark:ring-pink-400 p-1"
                            />
                          </motion.div>
                          <div className="space-y-2 md:space-y-3 text-center">
                            <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                              {testimonial.name}
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 italic leading-relaxed font-light">
                              "{testimonial.quote}"
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <CarouselPrevious className="relative pointer-events-auto flex -left-2 md:-left-12 hover:scale-110 transition-transform duration-300 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 border-none shadow-md">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-pink-600 dark:text-pink-400" />
              </CarouselPrevious>
              <CarouselNext className="relative pointer-events-auto flex -right-2 md:-right-12 hover:scale-110 transition-transform duration-300 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 border-none shadow-md">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-pink-600 dark:text-pink-400" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
