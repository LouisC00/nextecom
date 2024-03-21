"use client";
import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  pathname,
  searchParams = {},
}) {
  return (
    <div className="row">
      <div className="col">
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const queryString = new URLSearchParams({
                ...searchParams,
                page: page.toString(),
              }).toString();

              return (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    href={`${pathname}?${queryString}`}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
