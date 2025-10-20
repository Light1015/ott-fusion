import { useState } from "react";
import { apiFetch } from "@/lib/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  async function register(name: string, email: string, password: string) {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  }

  async function login(email: string, password: string) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (data.token) localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return { user, register, login, logout };
}