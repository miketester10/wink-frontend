import { useEffect } from "react";
import { useBooksSearch } from "../api/books";
import { useGlobalStore } from "../store/globalStore";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { ErrorAlert } from "../components/ErrorAlert";
import { Paginator } from "../components/Paginator";
import { BookCard } from "../components/BookCard";

export const BookListPage = () => {
  const { search, setSearch, query, setQuery, page, setPage, pageSize, setPageSize } = useGlobalStore();

  const { data, isLoading, isError } = useBooksSearch({
    query,
    page,
    pageSize,
  });

  const totalItems = data?.totalItems ?? 0;
  const items = data?.items ?? [];

  // Debounce della ricerca: aspetta 400ms dopo l'ultima digitazione prima di eseguire la query.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1); // Resetta alla prima pagina ad ogni nuova ricerca
      setPageSize(5); // Resetta al page size di default (5) ad ogni nuova ricerca
      setQuery(search);
    }, 400);

    return () => {
      clearTimeout(timeoutId); // Pulisce il timeout precedente se l'utente digita di nuovo prima dei 400ms.
    };
  }, [search, setPage, setPageSize, setQuery]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">Ricerca libri</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Cerca tra i risultati di Google Books e apri il dettaglio di ciascun volume.</p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {isLoading && <Spinner />}

      {isError && <ErrorAlert message={"Errore durante il caricamento."} />}

      {!isLoading && !isError && items.length === 0 && query && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Nessun risultato trovato.</p>}

      <div className="mt-3">
        {items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Paginator
        currentPage={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPage(1); // Resetta alla prima pagina quando cambia il page size
          setPageSize(size);
        }}
      />
    </div>
  );
};
