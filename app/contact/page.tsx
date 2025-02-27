'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-24 pb-16 container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-8 playfair-display text-pink-500">
        Contactez-nous
      </h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Restons en contact</h2>
            <p className="text-gray-600">
              Une question, une suggestion ou simplement envie de discuter de cuisine ? 
              N&apos;hésitez pas à nous contacter !
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">contact@culiko.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-medium">Téléphone</h3>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="text-gray-600">123 Avenue de la Cuisine<br />75000 Paris, France</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Le sujet de votre message"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Votre message..."
                className="min-h-[150px]"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  );
}
