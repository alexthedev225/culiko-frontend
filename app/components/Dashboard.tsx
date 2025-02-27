// app/dashboard/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import {
  UserGroupIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

interface Activity {
  description: string;
  time: string;
}

interface Recipe {
  name: string;
  rating: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    pendingComments: 0,
    totalViews: 0,
    averageRating: 0,
    activeUsers: 0,
  });
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [recipesByCategory, setRecipesByCategory] = useState([]);
  const [visitsData, setVisitsData] = useState([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      description: "Chargement des activités...",
      time: "maintenant",
    },
  ]);
  const [topRatedRecipes, setTopRatedRecipes] = useState<Recipe[]>([
    {
      name: "Chargement des recettes...",
      rating: 0,
    },
  ]);

  const dashboardRef = useRef(null);

  useEffect(() => {
    // Animation GSAP
    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // Requête API pour les statistiques
    const fetchStats = async () => {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get("/api/dashboard", config);
        setStats(response.data.stats);
        setPopularRecipes(response.data.popularRecipes);
        setRecipesByCategory(response.data.recipesByCategory);
        setVisitsData(response.data.visitsData);
        setRecentActivity(response.data.recentActivity);
        setTopRatedRecipes(response.data.topRatedRecipes);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques :",
          error
        );
      }
    };

    fetchStats();
  }, []);

  // Couleurs pour le PieChart
  const COLORS = ["#4FD1C5", "#63B3ED", "#F6AD55", "#F56565"];

  return (
    <div ref={dashboardRef} className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Exporter les données
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Nouveau rapport
          </button>
        </div>
      </div>

      {/* Cards des Statistiques Clés - Style modernisé */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpenIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">Recettes</h2>
              <p className="text-2xl font-bold text-green-600">
                {stats.totalRecipes}
              </p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <ArrowTrendingUpIcon className="inline w-4 h-4 mr-1" />
            +12% ce mois
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">
                Utilisateurs
              </h2>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <ArrowTrendingUpIcon className="inline w-4 h-4 mr-1" />
            +5% ce mois
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <ChatBubbleLeftIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-600">
                Commentaires en Attente
              </h2>
              <p className="text-2xl font-bold text-red-600">
                {stats.pendingComments}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section : Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6 text-blue-600" />
            Activité récente
          </h2>
          <div className="space-y-4">
            {recentActivity?.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucune activité récente</p>
            )}
          </div>
        </div>

        {/* Top Recettes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            Top Recettes
          </h2>
          <div className="space-y-4">
            {topRatedRecipes?.length > 0 ? (
              topRatedRecipes.map((recipe, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{recipe.name}</p>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < recipe.rating
                              ? "fill-yellow-500"
                              : "fill-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucune recette notée</p>
            )}
          </div>
        </div>
      </div>

      {/* Graphiques améliorés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6 text-purple-600" />
            Répartition des Recettes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={recipesByCategory}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {recipesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PresentationChartLineIcon className="w-6 h-6 text-blue-600" />
            Visites du Site
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3182ce"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
