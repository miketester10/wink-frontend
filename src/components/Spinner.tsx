export const Spinner = () => {
  return (
    <div className="flex justify-center my-6" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
    </div>
  );
};
