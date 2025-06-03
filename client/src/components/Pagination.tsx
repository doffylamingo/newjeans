import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <button
        className="px-4 py-2 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <ChevronLeft className="size-7" />
      </button>

      <div className="px-4 py-2">
        <span className="font-bold">{currentPage}</span> /{" "}
        <span className="font-medium">{totalPages}</span>
      </div>

      <button
        className="px-4 py-2 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <ChevronRight className="size-7" />
      </button>
    </div>
  );
}
