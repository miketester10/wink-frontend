import { useGlobalStore } from "../store/globalStore";
import { useBooksSearch } from "../hooks/useBooksSearch";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { ErrorAlert } from "../components/ErrorAlert";
import { Paginator } from "../components/Paginator";
import { BookCard } from "../components/BookCard";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

export const BookListPage = () => {
  const { search, setSearch, page, setPage, pageSize, setPageSize } = useGlobalStore();

  useEffect(() => {
    if (search === "") {
      setPage(1);
      setPageSize(5);
    }
  }, [search]);

  const [debouncedSearch] = useDebounce(search, 600);

  const { data, isLoading, isError } = useBooksSearch({
    search: search ? debouncedSearch : search,
    page,
    pageSize,
  });

  const items = data?.items ?? [];
  const totalItems = data?.totalItems ?? 0;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">Ricerca libri</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Cerca tra i risultati di Google Books e apri il dettaglio di ciascun libro.</p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {isLoading && <Spinner />}

      {isError && <ErrorAlert message={"Errore durante il caricamento."} />}

      {!isLoading && !isError && items.length === 0 && search && search === debouncedSearch && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Nessun risultato trovato.</p>
      )}

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
