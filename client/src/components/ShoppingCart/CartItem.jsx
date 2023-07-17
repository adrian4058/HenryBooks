import React from "react";

const CartItem = ({ name, image, genre, price, quantity, id, delFromCart }) => {
  return (
    <div className="Cart-book">
      <div className="Cart-book__info">
        <img className="card-img-cart" src={image} alt="ImgPRUEBA" />
        <div>
          <h2>{name}</h2>
          <br />
          <h4>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h4>
        </div>
      </div>
      <div>
        <h3>{quantity}</h3>
        <button className="Cart-btn" onClick={() => delFromCart(id)}>
          Eliminar uno
        </button>
      </div>
      <div className="Cart-info">
        <div className="Cart-price">
          <span>${price}.00</span>
        </div>
        <button className="Cart-btn" onClick={() => delFromCart(id, true)}>
          Eliminar todos
        </button>
      </div>
    </div>
  );
};

export default CartItem;
