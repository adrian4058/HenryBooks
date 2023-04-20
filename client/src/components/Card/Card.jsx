import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../Card/Card.css";

function Card({ name, image, price, author, genre, id, inSlider, addToCart }) {
  return (
    <div className={`card ${inSlider ? "slider-card" : ""}`}>
      <Link to={`/books/${id}`} className="card-container">
        <div className="card-img__container">
          <img className="card-img" src={image} alt="ImgPRUEBA" />
        </div>
        <div className="card-info">
          <div className="card-info__description">
            <div className="card-info__title">
              <h4>{name}</h4>
            </div>
            <p>
              <span>By: </span>
              {author}
            </p>
            <p>
              <span>Genre: </span>
              {genre}
            </p>
            <p>
              <span className="card-info__price">${price}</span>
            </p>
          </div>
        </div>
      </Link>
      {!inSlider ? (
        <button className="card-add" onClick={() => addToCart(id)}>
          <div>
            <span>Add</span>
            <span>to</span>
            <span>Cart</span>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </button>
      ) : null}
    </div>
  );
}

export default Card;
