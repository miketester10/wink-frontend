import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { BooksResponse } from "../types/books";

interface SearchParams {
  query: string;
  page: number;
  pageSize: number;
}

export const useBooksSearch = ({ query, page, pageSize }: SearchParams) => {
  return useQuery({
    queryKey: ["books", query, page, pageSize],
    enabled: query.trim().length > 0, // Esegui la query solo se la stringa di ricerca non è vuota
    queryFn: async (): Promise<BooksResponse> => {
      const startIndex = (page - 1) * pageSize;
      const response = await apiClient.get<BooksResponse>("/volumes", {
        params: {
          q: query,
          startIndex,
          maxResults: pageSize,
          orderBy: "relevance",
        },
      });
      return response.data;
    },
  });
};
