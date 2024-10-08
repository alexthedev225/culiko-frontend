"use client"
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:border-gray-700 border-b-2">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image height={32} width={100} alt="logo" src="/logo.png" />
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`hidden w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`} id="navbar-default">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-blue-500 ${pathname === '/' ? 'text-blue-500' : 'text-gray-900'} md:hover:bg-transparent md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700`}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/recette"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-blue-500 ${pathname === '/recette' ? 'text-blue-500' : 'text-gray-900'} md:hover:bg-transparent md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700`}
              >
                Recette
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-blue-500 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-900'} md:hover:bg-transparent md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700`}
              >
                À Propos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="block md:hidden bg-white p-3">
          <ul className="flex flex-col font-medium p-4  rounded-lg bg-gray-300 shadow-md">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-white ${pathname === '/' ? 'text-white bg-blue-400' : 'text-gray-900'}`}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/recette"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-white ${pathname === '/recette' ? 'text-white bg-blue-400' : 'text-gray-900'}`}
              >
                Recette
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded hover:bg-blue-400 hover:text-white ${pathname === '/about' ? 'text-white bg-blue-400' : 'text-gray-900'}`}
              >
                À Propos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
