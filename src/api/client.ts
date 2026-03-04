import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  timeout: 8000,
  params: {
    key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
  },
});
