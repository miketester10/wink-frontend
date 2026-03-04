import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { PageSize } from "../store/globalStore";

interface UseDebouncedSearchProps {
  search: string;
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: PageSize) => void;
  pageSizeDefault?: PageSize;
  debounceTime?: number;
}

export const useDebouncedSearch = ({ search, query, setQuery, setPage, setPageSize, pageSizeDefault = 5, debounceTime = 600 }: UseDebouncedSearchProps) => {
  const [debouncedSearch] = useDebounce(search, debounceTime);

  useEffect(() => {
    const resetSearch = (newQuery = "") => {
      setPage(1);
      setPageSize(pageSizeDefault);
      setQuery(newQuery);
    };

    // Caso 1: input vuoto → reset immediato
    if (search === "") {
      resetSearch();
      return;
    }

    // Caso 2: testo normale → debounce
    if (debouncedSearch !== query) {
      resetSearch(debouncedSearch);
    }
  }, [search, debouncedSearch, query, setQuery, setPage, setPageSize, pageSizeDefault]);
};
