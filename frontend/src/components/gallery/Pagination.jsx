const Pagination = ({ page, setPage, hasNext }) => {
    return (
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground disabled:opacity-50"
        >
          Previous
        </button>
  
        <span className="text-sm text-muted-foreground">
          Page {page + 1}
        </span>
  
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  