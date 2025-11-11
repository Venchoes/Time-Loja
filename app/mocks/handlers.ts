import { http, HttpResponse } from "msw";
import { products } from "~/data/products";

export const handlers = [
  // Produtos
  http.get("/api/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("/api/products/:id", ({ params }) => {
    const id = params.id as string;
    const product = products.find((p) => p.id === id);
    if (!product) return HttpResponse.json({ message: "not found" }, { status: 404 });
    return HttpResponse.json(product);
  }),

  // Pontos (Engajamento)
  http.get("/api/engajamento/pontos", () => {
    // mock: saldo fixo de pontos
    return HttpResponse.json({ balance: 1200 });
  }),

  // Checkout / pedido
  http.post("/api/orders", async ({ request }) => {
    const body = (await request.json()) as unknown;
    // retorna um pedido confirmando
    return HttpResponse.json({ id: "ord_123", status: "confirmed", pointsEarned: 300, body });
  }),
];
