import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { App } from "./App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDevelopment } from "./schemas/envSchema";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Non fetchare quando la finestra torna in focus (per esempio: dopo essere stata minimizzata, o cambiato tab, ecc.)
      retry: 1, // Riprova solo una volta in caso di errore
      staleTime: 5 * 60 * 1000, // I dati sono considerati "freschi" per 5 minuti prima di essere considerati "vecchi" e rifetchati.
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
