import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PageSize = 5 | 10 | 15 | 20;

interface GlobalStoreState {
  darkMode: boolean;
  page: number;
  pageSize: PageSize;
  search: string;
  query: string;
  toggleDarkMode: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: PageSize) => void;
  setSearch: (search: string) => void;
  setQuery: (query: string) => void;
}

export const useGlobalStore = create<GlobalStoreState>()(
  persist(
    (set) => ({
      darkMode: false,
      page: 1,
      pageSize: 5,
      search: "",
      query: "",
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
      setPage: (page) => set({ page }),
      setPageSize: (size) => set({ pageSize: size }),
      setSearch: (search) => set({ search }),
      setQuery: (query) => set({ query }),
    }),
    {
      name: "wink-ui-settings",
      partialize: (state) => ({
        darkMode: state.darkMode,
        pageSize: state.pageSize,
      }),
    },
  ),
);
