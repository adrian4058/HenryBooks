import React from "react";
import { Link } from "react-router-dom";
import Style from "../Card/Card.module.css"

function Card({ name, image, price, autor, genero }) {
  return (
    <div className={Style.card}>
      <div className={Style.img}>
        <img src={image} alt={name} />
      </div>
      <Link to="/details">
        <h4>{`Book: ${name}`}</h4>
      </Link>
      <div className={Style.content}>
        <p>{`Author: ${autor}`}</p>
        <p>{`Genre: ${genero}`}</p>
      </div>
      <div className={Style.content}>
        <p>{`$ ${price}`}</p>
      </div>
      <button className={Style.boton} onClick={() => alert("agregado al carrito")}>Add to cart</button>
    </div>
  );
}

export default Card;
