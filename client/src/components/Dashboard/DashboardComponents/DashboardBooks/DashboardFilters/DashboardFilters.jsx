import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAllDash, filterByAlphabetDash, filterByPriceDash } from "../../../../../actions";
import SearchBarDash from "./SearchBarDash/SearchBarDash";
import "./DashboardFilters.css";

const DashboardFilters = () => {
  const dispatch = useDispatch();
  const categorySelect = useRef();
  const editorialSelect = useRef();
  const alphabetSelect = useRef();
  const priceSelect = useRef();
  const authorsSelect = useRef();
  const statusSelect = useRef();

  const [, setOrder] = React.useState("")
  // allBooks contiene TODOS los libros
  const allBooks = useSelector(state => state.allBooksDashboard)
  // allBooksF contiene todos los libros según LOS FILTROS
  const allBooksD = useSelector(state => state.booksDashboard)

  // uniqueGender contiene un filtro donde aparecen todos los generos de los libros sin repetirsen
  const uniqueGender = allBooks !== undefined ? [...new Set(allBooks.map(book => book.genero))] : null
  // uniqueEditorial contiene un filtro donde aparecen todos las editoriales de los libros sin repetirsen
  const uniqueEditorial = allBooks !== undefined ? [...new Set(allBooks.map(book => book.editorial))] : null
  // uniqueAuthor contiene un filtro donde aparecen todos los autores de los libros sin repetirsen
  const uniqueAuthor = allBooks !== undefined ? [...new Set(allBooks.map(book => book.Autor?.nombre))] : null

  //
  const [categoryValue, setCategoryValue] = React.useState("All");
  const [editorialValue, setEditorialValue] = React.useState("All");
  const [authorValue, setAuthorValue] = React.useState("All");
  const [statusValue, setStatusValue] = React.useState("All");

  // Despachar filtros combinados
  const handleFilterChange = (category, editorial, author, status) => {
    setCategoryValue(category);
    setEditorialValue(editorial);
    setAuthorValue(author);
    setStatusValue(status);
    dispatch(filterAllDash(category, editorial, author, status));
  };

  // handler para filtrar alfabeticamente
  function handlerOrderAlphabet(e) {
    e.preventDefault();
    dispatch(filterByAlphabetDash(e.target.value))
    //setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  // handler para filtrar por precios
  function handlerOrderPrice(e) {
    e.preventDefault();
    dispatch(filterByPriceDash(e.target.value))
    //setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  // Handler para reiniciar filtros y establecer los valores a "All"
  function handleReset(e) {
    setCategoryValue("All")
    setAuthorValue("All")
    setEditorialValue("All")
    setStatusValue("activo")
    categorySelect.current.value = "All";
    editorialSelect.current.value = "All";
    // alphabetSelect.current.value = "All";
    // priceSelect.current.value = "All";
    authorsSelect.current.value = "All";
    statusSelect.current.value = "All";
    handleFilterChange("All", "All", "All", "All");
    //setCurrentPage(1);
  }

  return (
    <div className="DashboardFilters">
      <div>
        <div className="dashboard-filters-flex">
          <button className="reset-btn-dash" onClick={() => handleReset()}>Reset Filter</button>

          <SearchBarDash />

          <div className="dashboard-filter-dash">
            <div className="dashboard-filter-title">Gender:</div>
            <div>
              <select className="dashboard-filter-select" ref={categorySelect} onChange={(e) => setCategoryValue(e.target.value) & handleFilterChange(e.target.value, editorialValue, authorValue, statusValue)}>
                <option className="dashboard-filter-option" defaultValue="All" value="All">All</option>
                {uniqueGender?.map((book) => (
                  <option className="dashboard-filter-option" key={book} value={book}>{book}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-filter-dash">
            <div className="dashboard-filter-title">Author:</div>
            <div>
              <select className="dashboard-filter-select" ref={authorsSelect} onChange={(e) => setAuthorValue(e.target.value) & handleFilterChange(categoryValue, editorialValue, e.target.value, statusValue)}>
                <option className="dashboard-filter-option" defaultValue="All" value="All">All</option>
                {uniqueAuthor?.map((book) => (
                  <option className="dashboard-filter-option" key={book} value={book}>{book}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-filter-dash">
            <div className="dashboard-filter-title">Editorial:</div>
            <div>
              <select className="dashboard-filter-select" ref={editorialSelect} onChange={(e) => setEditorialValue(e.target.value) & handleFilterChange(categoryValue, e.target.value, authorValue, statusValue)}>
                <option className="dashboard-filter-option" defaultValue="All" value="All">All</option>
                {uniqueEditorial?.map((book) => (
                  <option className="dashboard-filter-option" key={book} value={book}>{book}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-filter-dash">
            <div className="dashboard-filter-title">Status:</div>
            <div>
              <select className="dashboard-filter-select" ref={statusSelect} onChange={(e) => setStatusValue(e.target.value) & handleFilterChange(categoryValue, editorialValue, authorValue, e.target.value)}>
                <option className="dashboard-filter-option" defaultValue="All" value="All">All</option>
                <option className="dashboard-filter-option" value="activo">Active</option>
                <option className="dashboard-filter-option" value="desactivado">Desactive</option>
                {/* {uniqueEditorial?.map((book) => (
                  <option key={book} value={book}>{book}</option>
                ))} */}
              </select>
            </div>
          </div>

          {/* <div>
            <div>Order by Alphabet</div>
            <div>
              <select ref={alphabetSelect} onChange={(e) => handlerOrderAlphabet(e)}>
                <option value="All">All</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </select>
            </div>
          </div> */}

          {/* <div>
            <div>Order by Price</div>
            <div>
              <select ref={priceSelect} onChange={(e) => handlerOrderPrice(e)}>
                <option value="All">All</option>
                <option value="ASC_PRICE">Price (smaller-higher)</option>
                <option value="DESC_PRICE">Price (higher-smaller)</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardFilters;