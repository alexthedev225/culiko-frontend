"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const PrintButton = ({
  className,
  variant = "default",
  size = "default",
}: PrintButtonProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={className}
    >
      <Printer className="w-4 h-4 mr-2" />
      Imprimer la recette
    </Button>
  );
};

export default PrintButton;
