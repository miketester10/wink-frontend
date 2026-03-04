import axios from "axios";
import { env } from "../schemas/envSchema";

export const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  timeout: 8000,
  params: {
    key: env.VITE_GOOGLE_BOOKS_API_KEY,
  },
});
