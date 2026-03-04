import { z } from "zod";

const envSchema = z.object({
  VITE_GOOGLE_BOOKS_API_KEY: z.string().trim().nonempty("API_BASE_URL is required."),
});

const envParsed = envSchema.safeParse(import.meta.env);

if (!envParsed.success) {
  console.error("❌ Variabili d'ambiente non valide:", z.treeifyError(envParsed.error).properties);
  throw new Error("❌ Variabili d'ambiente non valide. Controlla la console per i dettagli.");
}

type envType = z.infer<typeof envSchema>;
export const env: envType = envParsed.data;
export const isDevelopment = import.meta.env.PROD;
