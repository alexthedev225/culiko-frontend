"use client";

import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AuthService } from "../services/auth.service";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Accueil", icon: HomeIcon, href: "/admin" },
    { name: "Dashboard", icon: ChartBarIcon, href: "/admin/dashboard" },
    { name: "Utilisateurs", icon: UserGroupIcon, href: "/admin/users" },
    { name: "Recettes", icon: BookOpenIcon, href: "/admin/recipes" },
    { name: "Paramètres", icon: CogIcon, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t sticky bottom-0 bg-white">
            <Link href="/" className="block px-6 py-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                <HomeIcon className="w-4 h-4" />
                Retour au site
              </button>
            </Link>
          </div>
        </nav>
      </aside>

      <main className="flex-1 ml-64 overflow-x-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-end h-16 px-8">
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <Image
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
