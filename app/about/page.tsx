'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Heart, Users, Utensils, Star, Coffee } from "lucide-react";

const features = [
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Recettes de Qualité",
    description: "Des recettes soigneusement sélectionnées et testées pour votre satisfaction"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Fait avec Amour",
    description: "Chaque recette est créée avec passion et attention aux détails"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Communauté Active",
    description: "Rejoignez une communauté passionnée de cuisine"
  }
];

const faqItems = [
  {
    question: "Comment sont créées les recettes ?",
    answer: "Nos recettes sont générées par une intelligence artificielle avancée, puis vérifiées et ajustées par notre équipe pour garantir leur qualité et leur faisabilité."
  },
  {
    question: "Puis-je proposer mes propres recettes ?",
    answer: "Bientôt ! Nous travaillons sur une fonctionnalité qui permettra aux utilisateurs de partager leurs propres recettes."
  },
  {
    question: "Les recettes sont-elles vérifiées ?",
    answer: "Oui, chaque recette est validée par notre équipe avant d&apos;être publiée sur la plateforme."
  }
];

const teamMembers = [
  {
    name: "Alex Konan",
    role: "Fondateur & Développeur",
    image: "/alex-avatar.jpeg",
    skills: ["Next.js", "React", "UI/UX"],
    description: "Passionné par le développement web et la cuisine, Alex a créé Culiko pour partager sa passion avec le monde entier."
  }
];

const About: React.FC = () => {
  return (
    <div className="pt-8 min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 playfair-display text-pink-500">
              À propos de Culiko
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l&apos;histoire derrière votre nouvelle plateforme de recettes préférée
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-500">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission et Vision */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-4 playfair-display text-gray-900">
                    Notre Mission
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Chez Culiko, notre mission est de vous fournir des recettes de
                    qualité, simples et délicieuses, pour que chaque repas soit une
                    aventure culinaire inoubliable. Nous croyons en l&apos;importance de
                    cuisiner avec des ingrédients frais et de partager des moments
                    précieux autour de la table.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold mb-4 playfair-display text-gray-900">
                    Notre Vision
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Nous aspirons à devenir la meilleure plateforme de partage de
                    recettes en ligne, en offrant une expérience utilisateur
                    exceptionnelle et un contenu culinaire inspirant pour les cuisiniers
                    de tous niveaux.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Équipe */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8 playfair-display text-gray-900">
              Notre Équipe
            </h2>
            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
              {teamMembers.map((member, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-6">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                            <div className="flex gap-2 mt-2">
                              {member.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm text-gray-600">{member.description}</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8 playfair-display text-gray-900">
              Questions Fréquentes
            </h2>
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
