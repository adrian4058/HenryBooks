import React, { useState } from "react";
import "./Paginate.css";

export default function Paginado({ booksPerPage, allBooks, paginado }) {
  const pageNumbers = [];
  const [activePage, setActivePage] = useState(1);

  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <button
            className={`pagination-btn ${
              activePage === number ? "active" : ""
            }`}
            key={number}
            onClick={() => {
              paginado(number);
              setActivePage(number);
            }}
          >
            {number}
          </button>
        ))}
    </nav>
  );
}
