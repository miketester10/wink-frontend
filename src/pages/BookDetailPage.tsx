import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useBookDetail } from "../hooks/useBookDetail";
import { Spinner } from "../components/Spinner";
import { ErrorAlert } from "../components/ErrorAlert";
import NoImageAvailable from "../assets/No_Image_Available.jpg";

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useBookDetail(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return <ErrorAlert message={"Errore nel caricamento del libro."} />;
  }

  const { volumeInfo } = data;
  const { title, authors, description, imageLinks, infoLink, publishedDate, publisher } = volumeInfo;

  return (
    <div className="mt-2">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        <ArrowLeft size={16} /> Torna ai risultati
      </Link>

      <div className="mt-2 grid gap-6 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
        <div>
          <img
            src={imageLinks?.thumbnail ?? NoImageAvailable}
            alt={title}
            onError={(e) => (e.currentTarget.src = NoImageAvailable)}
            className="w-full max-w-xs rounded-xl border border-slate-200 bg-slate-100 object-cover shadow-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{title}</h2>
          {authors && <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">di {authors.join(", ")}</p>}
          {(publishedDate || publisher) && (
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {publishedDate && <span>Pubblicato: {publishedDate}</span>}
              {publishedDate && publisher && <span> · </span>}
              {publisher && <span>Editore: {publisher}</span>}
            </p>
          )}

          {infoLink && (
            <a
              href={infoLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              Apri su Google Books <ExternalLink size={16} />
            </a>
          )}

          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{description ?? "Nessuna descrizione disponibile per questo libro."}</p>
        </div>
      </div>
    </div>
  );
};
