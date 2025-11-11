import type { CarProduct } from "~/types/product";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";

export async function fetchAllProducts(): Promise<CarProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<CarProduct | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    return null;
  }
}
