import React from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import books from "../../utils/books.js";
import Paginate from "../Paginate/Paginate"
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, filterByAlphabet, filterByPrice, filterByEditorial, filterByCategory, filterByAuthor, getAllAuthors } from '../../actions/index'
import "./Home.css";
import Slider from '../Slider/Slider'
import { useRef } from "react";

function Home(props) {
  const dispatch = useDispatch();
  const categorySelect = useRef();
  const editorialSelect = useRef();
  const alphabetSelect = useRef();
  const priceSelect = useRef();
  const authorsSelect = useRef();

  const [order, setOrder] = React.useState("")
  const [selectedAuthor, setSelectedAuthor] = React.useState("All");
  const allBooks = useSelector(state => state.allBooks)
  const allBooksF = useSelector(state => state.books)

  const uniqueBooks = allBooks !== undefined ? [...new Set(allBooks.map(book => book.genero))] : null

  //Paginado
  const [booksPerPage, setBooksPerPage] = React.useState(6)
  const [currentPage, setCurrentPage] = React.useState(1)
  const indexLast = currentPage * booksPerPage
  const indexFirst = indexLast - booksPerPage
  const books = allBooksF !== undefined ? allBooksF.slice(indexFirst, indexLast) : null

  console.log(books);

  React.useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])


  function handlerByCategory(e) {
    dispatch(filterByCategory(e.target.value))
    setCurrentPage(1)
  }

  function handlerByEditorial(e) {
    dispatch(filterByEditorial(e.target.value))
    setCurrentPage(1)
  }

  function handlerOrderAlphabet(e) {
    e.preventDefault();
    dispatch(filterByAlphabet(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  function handlerOrderPrice(e) {
    e.preventDefault();
    dispatch(filterByPrice(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  function handlerByAuthor(e) {
    setSelectedAuthor(e.target.value);
    dispatch(filterByAuthor(e.target.value));
  }

  function handleReset(e) {
    dispatch(getAllBooks());
    categorySelect.current.value = "All";
    editorialSelect.current.value = "All";
    alphabetSelect.current.value = "All";
    priceSelect.current.value = "All";
    authorsSelect.current.value = "All";
    setCurrentPage(1);
  }

  const paginado = (pageNumber) => { setCurrentPage(pageNumber) }

  return (
    <div className="home">
      <Navbar />
      <div className="home-welcome">
        <h1 className="home-welcome__h1">Welcome to HenryBooks!</h1>
        <h3 className="home-welcome__h3">Here you can find your favorite books</h3>
      </div>

      <Slider />
      {
        !allBooks?.length ?
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg> :
          <div className="home-books">
            <div className="home-filters">
              <div className="home-filter__content">
                <button className="filter-reset__btn" onClick={() => handleReset()}>Reset Filter</button>
              </div>

              <div className="home-searchbar">
                <SearchBar />
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Gender</div>
                <div className="home-filter">
                  <select ref={categorySelect} onChange={(e) => handlerByCategory(e)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueBooks?.map((book) => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Author</div>
                <div className="home-filter">
                  <select ref={authorsSelect} onChange={(e) => handlerByAuthor(e)}>
                    <option defaultValue="All" value="All">All</option>
                    {allBooks?.map((book) => (
                      <option key={book.id} value={book.Autor.nombre}>{book.Autor.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Editorial</div>
                <div className="home-filter">
                  <select ref={editorialSelect} onChange={(e) => handlerByEditorial(e)}>
                    <option value="All">All</option>
                    {allBooks?.map((book) => (
                      <option key={book.id} value={book.editorial}>{book.editorial}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Alphabet</div>
                <div className="home-filter">
                  <select ref={alphabetSelect} onChange={(e) => handlerOrderAlphabet(e)}>
                    <option value="All">All</option>
                    <option value="ASC">A-Z</option>
                    <option value="DESC">Z-A</option>
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Price</div>
                <div className="home-filter">
                  <select ref={priceSelect} onChange={(e) => handlerOrderPrice(e)}>
                    <option value="All">All</option>
                    <option value="ASC_PRICE">Price (smaller-higher)</option>
                    <option value="DESC_PRICE">Price (higher-smaller)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="book-card">
              {
                books.map(elem =>
                  <Card
                    key={elem.id}
                    genre={elem.genero}
                    author={elem.Autor.nombre}
                    image={elem.image}
                    name={elem.name}
                    id={elem.id}
                    price={elem.price} />)}
            </div>
          </div>
      }

      <Paginate booksPerPage={booksPerPage} allBooks={allBooksF.length} paginado={paginado} />
      <Footer />
    </div >
  );
}

export default Home;
