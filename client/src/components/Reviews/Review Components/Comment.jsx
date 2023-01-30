import React from "react";

function Comment({titulo,descripcion,calificacion}){
    return(
    <div>
        <h4>{titulo}</h4>
        <p>{descripcion}</p>
        <span>{calificacion}</span>
        <button> 🚩</button>

    </div>)
}

export default Comment