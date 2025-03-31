'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';
import { usePathname } from "next/navigation";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'inscription à la newsletter
    console.log('Newsletter subscription submitted');
  };
const pathname = usePathname();
if (pathname.startsWith("/admin")) return null;


  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Culiko Logo"
                width={120}
                height={40}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm mb-4">
              Culiko est un projet expérimental utilisant l&apos;intelligence artificielle 
              pour générer et partager des recettes de cuisine. Cette plateforme est 
              conçue à des fins de démonstration et d&apos;exploration des possibilités 
              offertes par l&apos;IA dans le domaine culinaire.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recette"
                  className="hover:text-pink-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Recettes
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-pink-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-pink-500 transition-colors flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-pink-500" />
                <a
                  href="mailto:contact@culiko.com"
                  className="hover:text-pink-500 transition-colors"
                >
                  alexcode225@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-pink-500" />
                <span>
                  Abidjan, Côte d&apos;Ivoire
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Abonnez-vous à notre newsletter pour recevoir nos dernières
              recettes et actualités.
            </p>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full">
                S&apos;abonner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <p className="flex items-center justify-center">
            {currentYear} Culiko. Fait avec
            <Heart className="w-4 h-4 mx-1 text-pink-500" />
            en Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
