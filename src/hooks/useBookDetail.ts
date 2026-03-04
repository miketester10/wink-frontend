import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { BookItem } from "../types/books";

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
