import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PageSize = 5 | 10 | 15 | 20;

interface UiState {
  darkMode: boolean;
  pageSize: PageSize;
  toggleDarkMode: () => void;
  setPageSize: (size: PageSize) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      darkMode: false,
      pageSize: 10,
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
      setPageSize: (size) => set({ pageSize: size }),
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
