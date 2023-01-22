import React from "react";
import { Link } from "react-router-dom";
import imagenPrueba from "../img/wallpaper.jpg";
import "../Card/Card.css"

function Card({ name, image, price, author, genre, id }) {
  return (
    <Link to={`/books/${id}`}>
      <div className="card">
        <div className="card-img__container">
          <img className="card-img" src={image} alt="ImgPRUEBA" />
        </div>
        <div className="card-info">
          <div className="card-info__description">
            <div className="card-info__title">
              <h4>{name}</h4>
            </div>
            <p><span>By: </span>{author}</p>
            <p><span>Genre: </span>{genre}</p>
            <p><span>Price: </span>${price}</p>
          </div>
          {/* <button className="card-add" onClick={() => alert("agregado al carrito")}>Add to cart<i className="fa-solid fa-cart-shopping"></i></button> */}
        </div>
      </div>
    </Link>
  );
}

export default Card;
