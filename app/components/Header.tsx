import Image from "next/image";
import React from "react";
import HeroSection from "./HeroSection";

const Header = () => {
  return (
    <div className="">
      <nav className="px-10 bg-white w-full h-[10vh]">
        <div className="relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo à gauche */}
            <div className="flex-shrink-0 relative">
              <Image height={200} width={100} alt="logo" src={"/logo.png"} />
            </div>

            {/* Liens de navigation à droite */}
            <div className="hidden sm:block">
              <div className="ml-4 flex items-center space-x-4">
                <a
                  href="#"
                  className="text-black-700 hover:text-black-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className="text-black-700 hover:text-black-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="text-black-700 hover:text-black-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  À Propos
                </a>
              </div>
            </div>

            {/* Menu hamburger pour les écrans mobiles */}
            <div className="block sm:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-gray-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Ouvrir le menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <HeroSection />
      <div className=" py-8 border-2">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center ">
    <h2 className="text-5xl font-bold text-gray-800 mb-4 playfair-display">
      Bienvenue sur Culiko
    </h2>
    <p className="text-lg text-gray-700">
      Découvrez une multitude de délices culinaires à savourer !
    </p>
  </div>
</div>

    </div>
  );
};

export default Header;
