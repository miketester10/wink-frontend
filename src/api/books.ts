import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { BooksResponse, BookItem } from "../types/books";

interface SearchParams {
  query: string;
  page: number;
  pageSize: number;
}


export const useBooksSearch = ({ query, page, pageSize }: SearchParams) => {
  return useQuery({
    queryKey: ["books", query, page, pageSize],
    enabled: query.trim().length > 0, // Esegui la query solo se la stringa di ricerca non è vuota
    queryFn: async () => {
      const startIndex = (page - 1) * pageSize;
      const response = await apiClient.get<BooksResponse>("/volumes", {
        params: {
          q: query, 
          startIndex, 
          maxResults: pageSize,
          key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
        },
      });
      return response.data;
    },
  });
};

export const useBookDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["book", id],
    enabled: Boolean(id),
    queryFn: async (): Promise<BookItem> => {
      const response = await apiClient.get<BookItem>(`/volumes/${id}`);
      return response.data;
    },
  });
};
