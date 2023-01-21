import React from "react";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { sortOfList, filterByCategory } from '../../actions/index'
import "./Home.css";

function Home(props) {
  const dispatch = useDispatch()
  const [order, setOrder] = React.useState("")
  function handlerByCategory(e) {
    dispatch(filterByCategory(e.target.value))
  }
  function handlerOrder(e) {
    dispatch(sortOfList(e.target.value))
    setOrder(`Order ${e.target.value}`)
  }
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
            <select onChange={handlerByCategory}>
              <option disabled>select gender</option>
              <option value="terror">Horror</option>
            </select>
          </div>
        </div>

        <div className="home-filter__content">
          <div className="filter-title">Order by Alphabet Or Price</div>
          <div className="home-filter">
            <select onChange={handlerOrder}>
              <option disabled>select order</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
              <option value="PD">Price (higher-smaller)</option>
              <option value="PA">Price (smaller-higher)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="book-card">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
