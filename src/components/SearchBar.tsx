import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <Search size={18} className="text-slate-400" />
      <input
        type="text"
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
        placeholder="Cerca libri..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value.trim() && (
        <button
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
          onClick={() => onChange("")}
        >
          Cancella
        </button>
      )}
    </div>
  );
};
