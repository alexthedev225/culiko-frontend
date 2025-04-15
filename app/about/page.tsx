'use client';

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../components/ui/hover-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { ChefHat, Heart, Users, Utensils, Star, Coffee } from "lucide-react";

const features = [
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Projet Expérimental",
    description: "Une démonstration des possibilités de l'IA dans la génération de recettes"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Innovation Tech",
    description: "Un projet full-stack combinant Next.js, React et l'IA générative"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Open Source",
    description: "Un projet personnel pour explorer les technologies modernes du web"
  }
];

const faqItems = [
  {
    question: "Comment sont créées les recettes ?",
    answer: "Les recettes sont générées automatiquement par des modèles d'intelligence artificielle. Ce projet est une démonstration technique et les recettes n'ont pas été testées en conditions réelles."
  },
  {
    question: "Quel est le but de ce projet ?",
    answer: "Culiko est un projet de démonstration technique que j'ai développé pour mettre en pratique mes compétences en développement web et en intégration d'IA. C'est une expérimentation plutôt qu'un service culinaire professionnel."
  },
  {
    question: "Les recettes sont-elles fiables ?",
    answer: "Les recettes sont générées par IA et n'ont pas été validées par des experts culinaires. Ce projet est avant tout une démonstration de ce qui est possible avec l'IA et le développement web moderne."
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
    <div className="pt-8 min-h-screen ">
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 playfair-display ">
              À propos de Culiko
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un projet de démonstration technique explorant la génération de recettes par IA
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
                  <h2 className="text-3xl font-semibold mb-4  text-gray-900">
                    Ma Mission
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Culiko est un projet expérimental que j&apos;ai créé pour explorer les 
                    possibilités offertes par l&apos;IA dans la génération de recettes 
                    de cuisine. Mon objectif est de démontrer les capacités des 
                    technologies modernes tout en créant une expérience utilisateur 
                    interactive et engageante.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold mb-4  text-gray-900">
                    Ma Vision
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ce projet démontre ma capacité à concevoir et développer 
                    des applications web modernes en utilisant les dernières technologies. 
                    Il représente une exploration pratique des possibilités offertes par 
                    l&apos;IA dans un contexte web.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Équipe */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8  text-gray-900">
              Le Développeur
            </h2>
            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
              {teamMembers.map((member, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-6">
                          <Avatar className="w-24 h-24">
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
            <h2 className="text-3xl font-semibold text-center mb-8  text-gray-900">
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
