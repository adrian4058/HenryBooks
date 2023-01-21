import React from "react";
import { Link } from "react-router-dom";
import imagenPrueba from "../img/wallpaper.jpg";
import "../Card/Card.css"

function Card({ name, image, price, autor, genero, id }) {
  return (
    <Link to={`/details/${id}`}>
      <div className="card">
        <div className="card-img__container">
          <img className="card-img" src={imagenPrueba} alt="ImgPRUEBA" />
        </div>
        <div className="card-info">
          <div className="card-info__title">
            <h4>{name}</h4>
          </div>
          <div className="card-info__description">
            <p><span>By: </span>{autor}</p>
            <p><span>Genre: </span>{genero}</p>
            <p><span>Price: </span>{price}</p>
          </div>
          <button className="card-add" onClick={() => alert("agregado al carrito")}>Add to cart<i className="fa-solid fa-cart-shopping"></i></button>
        </div>
      </div>
    </Link>
  );
}

export default Card;
