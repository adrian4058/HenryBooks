import React from "react";

function Card({ name, image, precio, autor }) {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h2>{name}</h2>
      <div>
        <p>{precio}</p>
      </div>
      <div>
        <p>{autor}</p>
      </div>
      <div>
        <button onClick={"algo"}>Add to car</button>
      </div>
    </div>
  );
}

export default Card;
