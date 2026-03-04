import { PageSize } from "../store/globalStore";

interface PaginatorProps {
  currentPage: number;
  totalItems: number;
  pageSize: PageSize;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSize) => void;
}

export const Paginator = ({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange }: PaginatorProps) => {
  if (totalItems === 0) {
    return null;
  }

  // Numero di pagine dinamico in base al totale elementi restituiti dall'API
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const allowedPageSizes: PageSize[] = [5, 10, 15, 20];

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-200 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          «
        </button>
        <span className="px-2 text-xs font-medium tracking-wide text-slate-500">
          Pagina {currentPage} di {totalPages}
        </span>
        <button
          type="button"
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          »
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Elementi per pagina:</span>
        <select
          className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value) as PageSize)}
        >
          {allowedPageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
