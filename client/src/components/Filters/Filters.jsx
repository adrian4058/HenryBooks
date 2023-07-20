import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Filters.css";
import Paginate from "../Paginate/Paginate";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import {
  filterByAlphabet,
  filterByPrice,
  filterAll,
} from "../../actions/index";
import { FiFilter } from "react-icons/fi";

const Filters = ({ allBooks, addToCart }) => {
  const dispatch = useDispatch();
  const allBooksF = useSelector((state) => state.books);
  // Referencias para los input
  const categorySelect = useRef();
  const editorialSelect = useRef();
  const alphabetSelect = useRef();
  const priceSelect = useRef();
  const authorsSelect = useRef();
  //PAGINADO
  const INITIAL_PAGE = 1;
  const FINAL_PAGE = 8;
  const [currentPage, setCurrentPage] = React.useState(INITIAL_PAGE);
  const [booksPerPage, setBooksPerPage] = React.useState(FINAL_PAGE);

  const indexFirst = (currentPage - 1) * booksPerPage;
  const indexLast = indexFirst + booksPerPage;

  const books =
    allBooksF !== undefined ? allBooksF.slice(indexFirst, indexLast) : null;
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  //FILTROS
  // Despachar Filtros Combinados
  const handleFilterChange = (category, editorial, author) => {
    setCategoryValue(category);
    setEditorialValue(editorial);
    setAuthorValue(author);
    dispatch(filterAll(category, editorial, author));
  };

  // handler para filtrar alfabeticamente
  function handlerOrderAlphabet(e) {
    e.preventDefault();
    dispatch(filterByAlphabet(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  // handler para filtrar por precios
  function handlerOrderPrice(e) {
    e.preventDefault();
    dispatch(filterByPrice(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  // Handler para reiniciar filtros y establecer los valores a "All"
  function handleReset(e) {
    setCategoryValue("All");
    setAuthorValue("All");
    setEditorialValue("All");
    categorySelect.current.value = "All";
    editorialSelect.current.value = "All";
    alphabetSelect.current.value = "All";
    priceSelect.current.value = "All";
    authorsSelect.current.value = "All";
    handleFilterChange("All", "All", "All");
    setCurrentPage(1);
  }
  const [, setOrder] = React.useState("");

  // uniqueGender contiene un filtro donde aparecen todos los generos de los libros sin repetirsen
  const uniqueGender =
    allBooks !== undefined
      ? [...new Set(allBooks.map((book) => book.genero))]
      : null;
  // uniqueEditorial contiene un filtro donde aparecen todos las editoriales de los libros sin repetirsen
  const uniqueEditorial =
    allBooks !== undefined
      ? [...new Set(allBooks.map((book) => book.editorial))]
      : null;
  // uniqueAuthor contiene un filtro donde aparecen todos los autores de los libros sin repetirsen
  const uniqueAuthor =
    allBooks !== undefined
      ? [...new Set(allBooks.map((book) => book.Autor?.nombre))]
      : null;

  const [categoryValue, setCategoryValue] = React.useState("All");
  const [editorialValue, setEditorialValue] = React.useState("All");
  const [authorValue, setAuthorValue] = React.useState("All");

  return (
    <div className="Filters__content">
      {!books?.length ? (
        <div className="home-books">
          <div className="home-searchbar">
            <SearchBar />
          </div>
          <div className="home-filters">
            <div className="home-filter__content">
              <button
                className="filter-reset__btn"
                onClick={() => handleReset()}
              >
                <FiFilter /> Reiniciar Filtros
              </button>
            </div>

            <div className="home-filter__content">
              <div className="filter-title">Género</div>
              <div className="home-filter">
                <select
                  ref={categorySelect}
                  onChange={(e) =>
                    setCategoryValue(e.target.value) &
                    handleFilterChange(
                      e.target.value,
                      editorialValue,
                      authorValue
                    )
                  }
                >
                  <option defaultValue="All" value="All">
                    All
                  </option>
                  {uniqueGender?.map((book) => (
                    <option key={book} value={book}>
                      {book}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="home-filter__content">
              <div className="filter-title">Autor</div>
              <div className="home-filter">
                <select
                  ref={authorsSelect}
                  onChange={(e) =>
                    setAuthorValue(e.target.value) &
                    handleFilterChange(
                      categoryValue,
                      editorialValue,
                      e.target.value
                    )
                  }
                >
                  <option defaultValue="All" value="All">
                    All
                  </option>
                  {uniqueAuthor?.map((book) => (
                    <option key={book} value={book}>
                      {book}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="home-filter__content">
              <div className="filter-title">Editorial</div>
              <div className="home-filter">
                <select
                  ref={editorialSelect}
                  onChange={(e) =>
                    setEditorialValue(e.target.value) &
                    handleFilterChange(
                      categoryValue,
                      e.target.value,
                      authorValue
                    )
                  }
                >
                  <option defaultValue="All" value="All">
                    All
                  </option>
                  {uniqueEditorial?.map((book) => (
                    <option key={book} value={book}>
                      {book}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="home-filter__content">
              <div className="filter-title">Alfabético</div>
              <div className="home-filter">
                <select
                  ref={alphabetSelect}
                  onChange={(e) => handlerOrderAlphabet(e)}
                >
                  <option value="All">Todos</option>
                  <option value="ASC">A-Z</option>
                  <option value="DESC">Z-A</option>
                </select>
              </div>
            </div>

            <div className="home-filter__content">
              <div className="filter-title">Precio</div>
              <div className="home-filter">
                <select
                  ref={priceSelect}
                  onChange={(e) => handlerOrderPrice(e)}
                >
                  <option value="All">Todos</option>
                  <option value="ASC_PRICE">Precio (menor-mayor)</option>
                  <option value="DESC_PRICE">Precio (mayor-menor)</option>
                </select>
              </div>
            </div>
          </div>

          <h1>No hay libros con estos filtros</h1>
        </div>
      ) : (
        <div className="home-books">
          <div className="home-filters">
            <div className="home-searchbar">
              <SearchBar />
            </div>
            <div className="home-filter__content-total">
              <button
                className="filter-reset__btn"
                onClick={() => handleReset()}
              >
                <FiFilter />
                Reiniciar Filtros
              </button>
              <div className="home-all-filter">
                <div className="home-filter__content">
                  <div className="home-filter">
                    <select
                      ref={categorySelect}
                      onChange={(e) =>
                        setCategoryValue(e.target.value) &
                        handleFilterChange(
                          e.target.value,
                          editorialValue,
                          authorValue
                        )
                      }
                    >
                      <option defaultValue="All" value="All">
                        Género
                      </option>
                      {uniqueGender?.map((book) => (
                        <option key={book} value={book}>
                          {book}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="home-filter__content">
                  <div className="home-filter">
                    <select
                      ref={authorsSelect}
                      onChange={(e) =>
                        setAuthorValue(e.target.value) &
                        handleFilterChange(
                          categoryValue,
                          editorialValue,
                          e.target.value
                        )
                      }
                    >
                      <option defaultValue="All" value="All">
                        Autor
                      </option>
                      {uniqueAuthor?.map((book) => (
                        <option key={book} value={book}>
                          {book}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="home-filter__content">
                  <div className="home-filter">
                    <select
                      ref={editorialSelect}
                      onChange={(e) =>
                        setEditorialValue(e.target.value) &
                        handleFilterChange(
                          categoryValue,
                          e.target.value,
                          authorValue
                        )
                      }
                    >
                      <option defaultValue="All" value="All">
                        Editorial
                      </option>
                      {uniqueEditorial?.map((book) => (
                        <option key={book} value={book}>
                          {book}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="home-filter__content">
                  <div className="home-filter">
                    <select
                      ref={alphabetSelect}
                      onChange={(e) => handlerOrderAlphabet(e)}
                    >
                      <option value="All">Alfabético</option>
                      <option value="ASC">A-Z</option>
                      <option value="DESC">Z-A</option>
                    </select>
                  </div>
                </div>

                <div className="home-filter__content">
                  <div className="home-filter">
                    <select
                      ref={priceSelect}
                      onChange={(e) => handlerOrderPrice(e)}
                    >
                      <option value="All">Precio</option>
                      <option value="ASC_PRICE">Precio (menor-mayor)</option>
                      <option value="DESC_PRICE">Precio (mayor-menor)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="book-card">
            {books.map((book) => (
              <Card
                key={book.id}
                genre={book.genero}
                author={book.Autor.nombre}
                image={book.image}
                name={book.name}
                id={book.id}
                addToCart={addToCart}
                price={book.price}
              />
            ))}
          </div>
          <Paginate
            booksPerPage={booksPerPage}
            allBooks={allBooksF.length}
            paginado={paginated}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            currentPage={currentPage}
            currentBooks={books}
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
