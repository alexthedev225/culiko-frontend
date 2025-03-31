"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../../services/auth.service";
import Dashboard from "../../components/Dashboard";
import LoadingScreen from "../../components/LoadingScreen";

export default function DashboardPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
        router.replace("/auth/login");
        return;
      }
      setIsAuthorized(true);
    };

    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return <LoadingScreen />;
  }

  return (
      <Dashboard />
  );
}
