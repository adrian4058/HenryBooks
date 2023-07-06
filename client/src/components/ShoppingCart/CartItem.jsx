import React from "react";

const CartItem = ({ name, image, price, quantity, id, delFromCart }) => {
  return (
    <div className="Cart-book">
      <div className="Cart-book__info">
        <h4>{name}</h4>
        <img className="card-img-cart" src={image} alt="ImgPRUEBA" />
      </div>
      <div className="Cart-info">
        <div className="Cart-price">
          <span>
            ${price} x {quantity} = ${price * quantity}
          </span>
        </div>
        <button className="Cart-btn" onClick={() => delFromCart(id)}>
          Eliminar uno
        </button>
        <button className="Cart-btn" onClick={() => delFromCart(id, true)}>
          Eliminar todos
        </button>
      </div>
    </div>
  );
};

export default CartItem;
