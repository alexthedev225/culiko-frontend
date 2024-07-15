import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-12 playfair-display text-gray-900">
          À propos de nous
        </h1>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Notre Mission
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Chez Culiko, notre mission est de vous fournir des recettes de
            qualité, simples et délicieuses, pour que chaque repas soit une
            aventure culinaire inoubliable. Nous croyons en l&apos;importance de
            cuisiner avec des ingrédients frais et de partager des moments
            précieux autour de la table.
          </p>
        </div>

        {/* Vision */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Notre Vision
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Nous aspirons à devenir la première plateforme de partage de
            recettes en ligne, en offrant une expérience utilisateur
            exceptionnelle et un contenu culinaire inspirant pour les cuisiniers
            de tous niveaux.
          </p>
        </div>

        {/* Équipe */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex ">
              <img
                src="/alex-avatar.jpeg"
                alt="Alex Konan"
                width={150}
                height={150}
                className="shadow-lg mr-6 image"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Alex Konan
                </h3>
                <p className="text-gray-700">
                  Fondateur & Développeur FullStack
                </p>
                <p className="text-gray-600 mt-2">
                  Passionné de cuisine et de technologie, Alex a créé Culiko
                  pour partager des recettes savoureuses et accessibles à tous.
                </p>
              </div>
            </div>
            <div className="flex ">
            <img
                src="/ai.jpg"
                alt="Alex Konan"
                width={150}
                height={150}
                className="shadow-lg mr-6 image"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Assistant IA
                </h3>
                <p className="text-gray-700">Soutien Virtuel</p>
                <p className="text-gray-600 mt-2">
                  En tant qu&apos;assistant IA, je collabore avec Alex pour
                  fournir un contenu de qualité et aider les utilisateurs à
                  explorer des recettes innovantes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Nos Valeurs
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li className="transition-colors duration-200 hover:text-gray-900">
              <span className="font-semibold">Qualité :</span> Nous nous
              engageons à vous fournir les meilleures recettes avec des
              ingrédients de qualité.
            </li>
            <li className="transition-colors duration-200 hover:text-gray-900">
              <span className="font-semibold">Innovation :</span> Nous aimons
              expérimenter et proposer de nouvelles recettes pour ravir vos
              papilles.
            </li>
            <li className="transition-colors duration-200 hover:text-gray-900">
              <span className="font-semibold">Partage :</span> Nous croyons en
              la puissance du partage de connaissances et d&apos;expériences
              culinaires.
            </li>
            <li className="transition-colors duration-200 hover:text-gray-900">
              <span className="font-semibold">Communauté :</span> Nous
              valorisons notre communauté de passionnés de cuisine et nous nous
              efforçons de créer un environnement accueillant et inspirant.
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Nous Contacter
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            Si vous avez des questions, des suggestions ou si vous souhaitez
            simplement partager une recette, n&apos;hésitez pas à nous contacter
            via notre formulaire de contact.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Formulaire de Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
