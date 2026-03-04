import { Link } from "react-router-dom";
import type { BookItem } from "../types/books";
import NoImageAvailable from "../assets/No_Image_Available.jpg";

interface BookCardProps {
  book: BookItem;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <Link
      to={`/book/${book.id}`}
      className="mb-3 flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="shrink-0">
        <img
          src={imageLinks?.thumbnail ?? NoImageAvailable}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = NoImageAvailable;
          }}
          className="h-24 w-16 rounded-md object-cover shadow-sm sm:h-28 sm:w-20"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h5 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</h5>
        {authors && <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{authors.join(", ")}</p>}
        <p className="mt-2 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">{description ?? "Nessuna descrizione disponibile."}</p>
      </div>
    </Link>
  );
};
