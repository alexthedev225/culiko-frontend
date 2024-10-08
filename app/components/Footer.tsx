import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-white to-pink-50 text-black ">
      <section className="py-12 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 playfair-display">Abonnez-vous à notre Newsletter</h2>
            <p className="text-lg text-gray-700 mb-8">
              Recevez les dernières recettes, articles et actualités directement dans votre boîte mail.
            </p>
            <form className="flex items-center justify-center">
              <input
                type="email"
                placeholder="Entrez votre adresse email"
                className="w-full max-w-xs px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 border"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-r-md transition duration-300"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" height={50} width={120} />
          </div>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><Link href={"/"} className="text-gray-700 hover:text-black">Accueil</Link></li>
              <li><Link href={"/recette"} className="text-gray-700 hover:text-black">Recette</Link></li>
              <li><Link href={"/about"} className="text-gray-700 hover:text-black">À Propos</Link></li>
              {/* <li><Link href={""} className="text-gray-700 hover:text-black">Contact</Link></li> */}
            </ul>
          </nav>
        </div>
        <div className="mt-4 md:mt-2 text-center text-gray-600">
          <p>&copy; {currentYear} Culiko. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
