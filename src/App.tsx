import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeToggle } from "./components/ThemeToggle";
import { BookListPage } from "./pages/BookListPage";
import { BookDetailPage } from "./pages/BookDetailPage";

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">WiNK Books</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="mx-auto max-w-5xl px-4">
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
