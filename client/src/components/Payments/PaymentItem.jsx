import React from "react";

const PaymentItem = ({ name, image, genre, price, quantity }) => {
  return (
    <div className="Cart-book">
      <div className="Cart-book__info">
        <img className="card-img-payment" src={image} alt="ImgPRUEBA" />
        <div>
          <h2>{name}</h2>
          <br />
          <h4>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h4>
        </div>
      </div>
      <div className="Cart-info">
        <h3>{quantity}</h3>
      </div>
      <div className="Cart-info__price">
        <div className="Cart-price">
          <span>${quantity * price}.00</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
