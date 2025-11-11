import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export async function startMockWorker() {
  if (typeof window !== "undefined") {
    // inicia apenas em dev
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
