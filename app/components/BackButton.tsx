"use client"
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import de l'icône de flèche gauche de Heroicons
import { useRouter } from 'next/navigation'; // Import du hook useRouter de Next.js

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Navigue vers la page précédente avec useRouter
  };

  return (
    <button
      onClick={handleGoBack}
      className="bg-black hover:bg-gray-900 transition-all ease-in-out duration-300 text-white py-2 px-4 rounded-lg flex items-center focus:outline-none z-10"
    >
      <ArrowLeftIcon className="h-6 w-6 mr-2" /> Retour
    </button>
  );
};

export default BackButton;
