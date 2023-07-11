import React from "react";
import { Link } from "react-router-dom";
import "../Card/Card.css";

function Card({ name, image, price, author, genre, id, inSlider, addToCart }) {
  return (
    <div className="card__total">
      {!inSlider ? (
        <div className="card__content">
          <Link to={`/books/${id}`} className="card-container">
            <img className="card-img" src={image} alt="ImgPRUEBA" />
            <h4 className="card-info__title">{name}</h4>
          </Link>
          <div className="card-info">
            <span className="card-info__price">${price}</span>
            <button className="card-add" onClick={() => addToCart(id)}>
              <i className="fa-solid fa-cart-shopping" />
              Añadir al Carrito
            </button>
          </div>
        </div>
      ) : (
        <div className="slider-card">
          <Link to={`/books/${id}`} className="slider__card-container">
            <img className="slider__card-img" src={image} alt="ImgPRUEBA" />
            <h4 className="slider__card-info__title">{name}</h4>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Card;
