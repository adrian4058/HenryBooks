import React from "react";
import { Link } from "react-router-dom";

function Card({ name, image, price, autor, genero }) {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <Link to="/details">
        <h4>{`Book: ${name}`}</h4>
      </Link>
      <div>
        <p>{`Author: ${autor}`}</p>
        <p>{`Genre: ${genero}`}</p>
      </div>
      <div>
        <p>{`$ ${price}`}</p>
      </div>
      <button onClick={() => alert("agregado al carrito")}>Add to cart</button>
    </div>
  );
}

export default Card;
