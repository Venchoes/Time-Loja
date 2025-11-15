import type { CarProduct } from "~/types/product";

// Base URL do backend (remove barras finais para evitar // em requests)
export const VITE_URL = (import.meta.env.VITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost"))
  .replace(/\/+$/, "");

const TOKEN_KEY = "token";

function resolveToken(): string | null {
  // Em SSR localStorage não existe; usar fallback da env quando necessário
  try {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      const stored = window.localStorage.getItem(TOKEN_KEY);
      if (stored && stored !== "undefined") return stored;
    }
  } catch (_) {
    // Ignora erros de acesso ao localStorage
  }
  const envToken = import.meta.env.VITE_USER_TOKEN;
  return envToken && envToken !== "" ? envToken : null;
}

async function doFetch(path: string, token: string | null) {
  const url = `${VITE_URL}${path}`;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(url, { method: "GET", headers });
  return response;
}

export async function fetchAllProducts(): Promise<CarProduct[]> {
  const token = resolveToken();
  try {
    const response = await doFetch("/api/veiculos", token);
    if (!response.ok) {
      console.error(`Falha ao buscar lista de veículos. Status: ${response.status}`);
      // Se 401, informar claramente
      if (response.status === 401) {
        console.warn("Token ausente ou inválido. Verifique login ou variável VITE_USER_TOKEN.");
      }
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro de rede ao buscar produtos:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<CarProduct | null> {
  const token = resolveToken();
  try {
    const response = await doFetch(`/api/veiculos/${id}`, token);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Veículo ${id} não encontrado (404).`);
        return null;
      }
      if (response.status === 401) {
        console.warn("Token ausente ou inválido ao buscar veículo. Verifique autenticação.");
      }
      console.error(`Falha ao buscar veículo ${id}. Status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data as CarProduct;
  } catch (error) {
    console.error(`Erro de rede ao buscar produto ${id}:`, error);
    return null;
  }
}
