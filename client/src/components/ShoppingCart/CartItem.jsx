import React from "react";

const CartItem = ({ name, image, price, author, quantity, id }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>
        <span>
          <img className="card-img" src={image} alt="ImgPRUEBA" />
        </span>
      </p>
      <p>
        <span>Autor: </span>
        {author}
      </p>
      <p>
        <span>$</span>
        {price} x {quantity} = ${price * quantity}
      </p>
      <button>Eliminar uno</button>
      <button>Eliminar todos</button>
    </div>
  );
};

export default CartItem;
