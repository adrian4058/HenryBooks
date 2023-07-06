import React, { useState } from "react";
import "./Paginate.css";

export default function Paginado({
  booksPerPage,
  allBooks,
  paginado,
  handleNext,
  handlePrevious,
  currentPage,
  currentBooks,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        <li>
          <button
            disabled={currentPage === 1}
            className="pagination-btn"
            onClick={handlePrevious}
          >
            {"Prev"}
          </button>
        </li>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={currentPage === number ? "active" : "pagination-btn"}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
        <li className="number">
          <button
            className="pagination-btn"
            disabled={currentBooks.length < booksPerPage}
            onClick={handleNext}
          >
            {"Next"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
