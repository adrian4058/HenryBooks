import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import Paginate from "../Paginate/Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooks,
  filterByAlphabet,
  filterByPrice,
  filterAll,
  TYPES,
} from "../../actions/index";
import "./Home.css";
import Slider from "../Slider/Slider";
import { useRef } from "react";
import Chat from "../ChatBot/Chat";
import SliderProducts from "../SliderProducts/SliderProducts";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Home(props) {
  const dispatch = useDispatch();
  // Llámado de libros
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  const history = useHistory();
  // Referencias para los input
  const categorySelect = useRef();
  const editorialSelect = useRef();
  const alphabetSelect = useRef();
  const priceSelect = useRef();
  const authorsSelect = useRef();
  //ESTADOS
  const token = useSelector((state) => state.token);
  const userProfile = useSelector((state) => state.userProfile);
  const cart = useSelector((state) => state.cart);
  // allBooks contiene TODOS los libros
  const allBooks = useSelector((state) => state.allBooks);
  // allBooksF contiene todos los libros según LOS FILTROS
  const allBooksF = useSelector((state) => state.books);

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

  //ALERTA CARRITO AÑADIR/LOGUEAR
  const [, addCartAlert] = useState(false);

  useEffect(() => {
    addCartAlert(true);
  }, []);

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    localStorage.setItem("cart", JSON.stringify(cart));
    addCartAlert(true);
    if (token && userProfile) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Añadido al Carrito",
        showConfirmButton: false,
        timer: 900,
      });
    } else {
      Swal.fire("Inicia sesión o regístrate para comprar", {
        icon: "warning",
        timer: 900,
      });
      history.push("/login");
    }
  };

  return (
    <div className="home">
      {/* {window.scrollTo(0, 0)} */}
      <div className="home-icons__sm">
        <a
          className="icon-color-fb"
          href="https://www.facebook.com/people/Henry-Book/100089922381588/"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-facebook" />
        </a>
        <a
          className="icon-color-ig"
          href="https://www.instagram.com/henrybooks_pf/"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-instagram" />
        </a>
        <a
          className="icon-color-tw"
          href="https://twitter.com/HenryBooks_PF"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-twitter" />
        </a>
      </div>
      <Navbar />
      <div className="home-content Container">
        <div className="home-welcome__content">
          <div className="home-welcome">
            <h1 className="home-welcome__h1">¡Bienvenido a Librería!</h1>
            <h3 className="home-welcome__h3">
              Aquí puedes encontrar tus libros favoritos
            </h3>
          </div>

          <Slider />
          <div className="home-products-slider">
            <SliderProducts />
          </div>
        </div>

        {!books?.length ? (
          <div className="home-books">
            <div className="home-filters">
              <div className="home-filter__content">
                <button
                  className="filter-reset__btn"
                  onClick={() => handleReset()}
                >
                  Reiniciar Filtros
                </button>
              </div>

              <div className="home-searchbar">
                <SearchBar />
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
              <div className="home-filter__content">
                <button
                  className="filter-reset__btn"
                  onClick={() => handleReset()}
                >
                  Reiniciar Filtros
                </button>
              </div>

              <div className="home-searchbar">
                <SearchBar />
              </div>

              <div className="home-all-filter">
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
                        Todos
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
                        Todos
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
                        Todos
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
          </div>
        )}

        <Paginate
          booksPerPage={booksPerPage}
          allBooks={allBooksF.length}
          paginado={paginated}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
          currentBooks={books}
        />
        <Chat />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
