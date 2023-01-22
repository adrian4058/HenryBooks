import React from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import books from "../../utils/books.js";
import Paginate from "../Paginate/Paginate"
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, sortOfList, filterByCategory } from '../../actions/index'
import "./Home.css";

function Home(props) {
  const dispatch = useDispatch()


  const [order, setOrder] = React.useState("")
  const allBooks = useSelector(state => state.books)

  //Paginado
  const [booksPerPage, setBooksPerPage] = React.useState(3)
  const [currentPage, setCurrentPage] = React.useState(1)
  const indexLast = currentPage * booksPerPage
  const indexFirst = indexLast - booksPerPage
  const books = allBooks.slice(indexFirst, indexLast)

  React.useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])

  function handlerByCategory(e) {
    dispatch(filterByCategory(e.target.value))
    setCurrentPage(1)
  }

  function handlerOrder(e) {
    dispatch(sortOfList(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`)
  }

  const paginado = (pageNumber) => { setCurrentPage(pageNumber) }

  return (
    <div className="home">
      <Navbar />
      <div className="home-welcome">
        <h1 className="home-welcome__h1">Welcome to HenryBooks!</h1>
        <h3 className="home-welcome__h3">Here you can find your favorite books</h3>
      </div>
      {/* *aqui iria la searchbar* */}

      <div className="home-filters">
        <div className="home-filter__content">
          <div className="filter-title">Order by Gender</div>
          <div className="home-filter">
            <select onChange={(e) => handlerByCategory(e)}>
              <option disabled>select gender</option>
              <option value="adventure">Adventure</option>
              <option value="Romance">Romance</option>
              <option value="Bélico">Bélico</option>
            </select>
          </div>
        </div>

        <div className="home-filter__content">
          <div className="filter-title">Order by Alphabet Or Price</div>
          <div className="home-filter">
            <select onChange={(e) => handlerOrder(e)}>
              <option disabled>select order</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
              {/* <option value="PRICE_HIGH">Price (higher-smaller)</option>
              <option value="PRICE_LOW">Price (smaller-higher)</option> */}
            </select>
          </div>
        </div>

        <div>
          <SearchBar />
        </div>

      </div>

      <div className="book-card">

        {!books.length && <h2>Loading...</h2>}
        {!!books.length && books.map(elem =>
          <Card
            key={elem.id}
            genre={elem.genero}
            author={elem.autor}
            image={elem.image}
            name={elem.name}
            id={elem.id}
            price={elem.price} />)}
      </div>
      <Paginate booksPerPage={booksPerPage} allBooks={allBooks.length} paginado={paginado} />
      <Footer />
    </div >
  );
}

export default Home;
