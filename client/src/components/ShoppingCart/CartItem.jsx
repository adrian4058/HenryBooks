import React from "react";

const CartItem = ({
  name,
  image,
  price,
  quantity,
  id,
  delFromCart,
}) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>
        <span>
          <img className="card-img" src={image} alt="ImgPRUEBA" />
        </span>
      </p>
      <p>
        <span>$</span>
        {price} x {quantity} = ${price * quantity}
      </p>
      <button onClick={() => delFromCart(id)}>Eliminar uno</button>
      <br />
      <button onClick={() => delFromCart(id, true)}>Eliminar todos</button>
    </div>
  );
};

export default CartItem;
