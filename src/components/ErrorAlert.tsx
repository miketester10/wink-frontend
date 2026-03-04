interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div
      className="my-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/60 dark:bg-red-950/40 dark:text-red-100"
      role="alert"
    >
      {message}
    </div>
  );
};
