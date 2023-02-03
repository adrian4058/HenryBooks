import React from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import Paginate from "../Paginate/Paginate"
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, filterByAlphabet, filterByPrice, filterAll } from '../../actions/index'
import "./Home.css";
import Slider from '../Slider/Slider'
import { useRef } from "react";
import Chat from "../ChatBot/Chat";
import SliderProducts from '../SliderProducts/SliderProducts'


function Home(props) {
  const dispatch = useDispatch();
  // Referencias para los input
  const categorySelect = useRef();
  const editorialSelect = useRef();
  const alphabetSelect = useRef();
  const priceSelect = useRef();
  const authorsSelect = useRef();

  const [, setOrder] = React.useState("")
  // allBooks contiene TODOS los libros
  const allBooks = useSelector(state => state.allBooks)
  // allBooksF contiene todos los libros según LOS FILTROS
  const allBooksF = useSelector(state => state.books)

  // uniqueGender contiene un filtro donde aparecen todos los generos de los libros sin repetirsen
  const uniqueGender = allBooks !== undefined ? [...new Set(allBooks.map(book => book.genero))] : null
  // uniqueEditorial contiene un filtro donde aparecen todos las editoriales de los libros sin repetirsen
  const uniqueEditorial = allBooks !== undefined ? [...new Set(allBooks.map(book => book.editorial))] : null
  // uniqueAuthor contiene un filtro donde aparecen todos los autores de los libros sin repetirsen
  const uniqueAuthor = allBooks !== undefined ? [...new Set(allBooks.map(book => book.Autor?.nombre))] : null

  //Paginado
  const [booksPerPage, setBooksPerPage] = React.useState(4)
  const [currentPage, setCurrentPage] = React.useState(1)
  const indexLast = currentPage * booksPerPage
  const indexFirst = indexLast - booksPerPage
  const books = allBooksF !== undefined ? allBooksF.slice(indexFirst, indexLast) : null

  //
  const [categoryValue, setCategoryValue] = React.useState("All");
  const [editorialValue, setEditorialValue] = React.useState("All");
  const [authorValue, setAuthorValue] = React.useState("All");

  // Llámado de libros
  React.useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])

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
    dispatch(filterByAlphabet(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  // handler para filtrar por precios
  function handlerOrderPrice(e) {
    e.preventDefault();
    dispatch(filterByPrice(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  // Handler para reiniciar filtros y establecer los valores a "All"
  function handleReset(e) {
    setCategoryValue("All")
    setAuthorValue("All")
    setEditorialValue("All")
    categorySelect.current.value = "All";
    editorialSelect.current.value = "All";
    alphabetSelect.current.value = "All";
    priceSelect.current.value = "All";
    authorsSelect.current.value = "All";
    handleFilterChange("All", "All", "All");
    setCurrentPage(1);
  }

  // función para páginado
  const paginado = (pageNumber) => { setCurrentPage(pageNumber) }

  return (
    <div className="home">
      <Navbar />
      <div className="home-welcome">
        <h1 className="home-welcome__h1">Welcome to HenryBooks!</h1>
        <h3 className="home-welcome__h3">Here you can find your favorite books</h3>
      </div>

      <Slider />
      <SliderProducts />

      <h1 className="Home-books-title">Dale un ojo a nuestros libros</h1>
      {
        !books?.length ?
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
                  <select ref={categorySelect} onChange={(e) => setCategoryValue(e.target.value) & handleFilterChange(e.target.value, editorialValue, authorValue)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueGender?.map((book) => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Author</div>
                <div className="home-filter">
                  <select ref={authorsSelect} onChange={(e) => setAuthorValue(e.target.value) & handleFilterChange(categoryValue, editorialValue, e.target.value)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueAuthor?.map((book) => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Editorial</div>
                <div className="home-filter">
                  <select ref={editorialSelect} onChange={(e) => setEditorialValue(e.target.value) & handleFilterChange(categoryValue, e.target.value, authorValue)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueEditorial?.map((book) => (
                      <option key={book} value={book}>{book}</option>
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

            <h1>No hay libros con estos filtros</h1>
          </div>
          :
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
                  <select ref={categorySelect} onChange={(e) => setCategoryValue(e.target.value) & handleFilterChange(e.target.value, editorialValue, authorValue)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueGender?.map((book) => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Author</div>
                <div className="home-filter">
                  <select ref={authorsSelect} onChange={(e) => setAuthorValue(e.target.value) & handleFilterChange(categoryValue, editorialValue, e.target.value)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueAuthor?.map((book) => (
                      <option key={book} value={book}>{book}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="home-filter__content">
                <div className="filter-title">Order by Editorial</div>
                <div className="home-filter">
                  <select ref={editorialSelect} onChange={(e) => setEditorialValue(e.target.value) & handleFilterChange(categoryValue, e.target.value, authorValue)}>
                    <option defaultValue="All" value="All">All</option>
                    {uniqueEditorial?.map((book) => (
                      <option key={book} value={book}>{book}</option>
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

      <Chat />
      <Paginate booksPerPage={booksPerPage} allBooks={allBooksF.length} paginado={paginado} />
      <Footer />
    </div >
  );
}

export default Home;
