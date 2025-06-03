import { useMemo, useState } from "react";

function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / perPage),
    [items.length, perPage],
  );

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * perPage;

    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  return {
    page,
    setPage,
    totalPages,
    paginatedItems,
  };
}

export default usePagination;
