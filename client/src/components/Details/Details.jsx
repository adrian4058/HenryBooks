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
  const dispatch = useDispatch();

  const details = useSelector((state) => state.detail);
  // const [allDetails, setAllDetails] = useState(null);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
    // setAllDetails(details)
  }, [dispatch, id]);

  console.log(details);

  <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>

  return (
    <div key={id} className="Details">
      <Navbar />
      <div className="book-container">
        {details ? <img className="book-img" src={details[0]?.image} alt="imagen-libro" /> : <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>}
        <div className="book-info">
          <div className="book-info__info">
            {details[0]?.name && <h4>{details[0]?.name}</h4>}
          </div>
          {/* <div className="book-info__info">
            {details.author && <h4>Author:</h4>}
            {details.author && <h4>{details.author}</h4>}
          </div> */}
          <div className="book-info__info">
            {details[0]?.editorial && <h4>Editorial: </h4>}
            {details[0]?.editorial && <p>{details[0]?.editorial}</p>}
          </div>
          <div className="book-info__info">
            {details[0]?.genero && <h4>Genre: {details[0]?.genero}</h4>}
          </div>
          <div className="book-info__info">
            {details[0]?.price && <h4 className="book-info__price">${details[0]?.price}</h4>}
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



