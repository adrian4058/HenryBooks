import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import books from "../../utils/books.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail } from "../../actions/index";

import "./Details.css";

function Details(props) {
  const { id } = useParams();
  const details = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const bookFiltered = books.filter(book => book.id === parseInt(id));

  // useEffect(() => {
  //   dispatch(getBookDetail(id));
  //   return () => dispatch(cleanDetail());
  // }, [dispatch, id]);

  return (
    <div className="Details">
      <Navbar />
      <div className="book-container">
        {/* {details.name ? <h1>{details.name}</h1> : <h1> <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i></h1>} */}
        {bookFiltered[0].image && <img className="book-img" src={bookFiltered[0].image} alt="imagen-libro" />}
        <div className="book-info">
          <div className="book-info__info">
            {bookFiltered[0].author && <h4>Author:</h4>}
            {bookFiltered[0].author && <h4>{bookFiltered[0].author}</h4>}
          </div>
          <div className="book-info__info">
            {bookFiltered[0].editorial && <h4>Editorial: </h4>}
            {bookFiltered[0].editorial && <p>{bookFiltered[0].editorial}</p>}
          </div>
          <div className="book-info__info">
            {bookFiltered[0].genre && <h4>Genre: {bookFiltered[0].genre}</h4>}
          </div>
          <div className="book-info__info">
            {bookFiltered[0].price && <h4>Price: {bookFiltered[0].price}</h4>}
          </div>
          <div className="">
            <button className="book-btn__buy">Add To Cart <i className="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
