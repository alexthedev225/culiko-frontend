'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 hover:bg-pink-50 text-pink-600"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      Retour aux recettes
    </Button>
  );
}
