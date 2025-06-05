const Spinner = () => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-t-transparent border-button-bw h-12 w-12"
      role="status"
    />
  );
};

export const Loader = () => {
  return (
    <div className={'flex items-center justify-center min-h-screen '}>
      <Spinner />
    </div>
  );
};
