import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useGlobalStore } from "../store/globalStore";

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useGlobalStore();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-500 dark:hover:text-sky-400"
      onClick={toggleDarkMode}
    >
      {darkMode ? <Moon size={18} /> : <Sun size={18} />}
      <span>{darkMode ? "Dark" : "Light"}</span>
    </button>
  );
};
