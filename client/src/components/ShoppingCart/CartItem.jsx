import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

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
      <div className="Cart-info">
        <h3>{quantity}</h3>
        <button className="Cart-btn" onClick={() => delFromCart(id)}>
          <MdOutlineDeleteForever className="Cart-icon" />
          Eliminar uno
        </button>
      </div>
      <div className="Cart-info__price">
        <div className="Cart-price">
          <span>${quantity * price}.00</span>
        </div>
        <button className="Cart-btn__all" onClick={() => delFromCart(id, true)}>
          <MdOutlineDeleteForever className="Cart-icon__all" />
          {/* Eliminar todos */}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
