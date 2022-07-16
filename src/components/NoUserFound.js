const NoUserFound = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <div className="text-4xl font-semibold">
        Sorry, this page isn't available
      </div>
      <div className="text-3xl">
        The link you followed may be broken, or the page may have been removed.
      </div>
    </div>
  );
};

export default NoUserFound;
