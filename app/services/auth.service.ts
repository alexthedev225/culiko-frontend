import Cookies from "js-cookie";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const AuthService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Stocker les informations d'authentification
    Cookies.set("token", data.token);
    Cookies.set("role", data.user.role);

    return data;
  },

  logout() {
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.href = "/auth/login";
  },

  isAuthenticated(): boolean {
    return !!Cookies.get("token");
  },

  isAdmin(): boolean {
    return Cookies.get("role") === "ADMIN";
  },
};
