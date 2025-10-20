// Simple fetch wrapper for frontend to call backend via /api (proxied in dev)
export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE || "";
  const url = `${base}/api${path.startsWith("/") ? path : "/" + path}`;

  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {})
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = (data && (data.error || data.message)) || res.statusText;
    throw new Error(err);
  }
  return data;
}