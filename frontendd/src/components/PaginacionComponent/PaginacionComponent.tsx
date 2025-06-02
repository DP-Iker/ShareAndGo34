import { useTranslation } from "react-i18next";
import type { FC } from "react";
import type { PaginacionProps } from "../../interfaces/PaginacionProps";

export const PaginacionComponent: FC<PaginacionProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageSizes = [5, 10, 20, 34, 50, 100];

  return (
    <div className="flex items-center justify-between mt-4 space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="pageSize" className="text-sm font-medium text-gray-300">
          {t("pagination.show")}:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer px-2 py-1 border border-gray-600 rounded-md bg-[#1F2937] text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {pageSizes.map((size) => (
            <option
              key={size}
              value={size}
              className="bg-[#1F2937] text-gray-300"
            >
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-[#374151] text-gray-300 rounded hover:bg-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {t("pagination.previous")}
        </button>
        <span className="text-sm text-gray-300">
          {t("pagination.page")} {currentPage + 1} {t("pagination.of")} {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="px-3 py-1 bg-[#374151] text-gray-300 rounded hover:bg-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
};
