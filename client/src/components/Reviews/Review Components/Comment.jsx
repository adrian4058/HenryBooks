import React from "react";
import "./Comment.css"

function Comment({titulo,descripcion,calificacion}){
    return(
    <div className="comment-ind">
       <div className="comment-title">
         <h4>{titulo}</h4>
         <button> 🚩</button>
       </div>
         <p>{descripcion}</p>
         <span>{calificacion} ⭐</span>
        
 
    </div>)
}

export default Comment