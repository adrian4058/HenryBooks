import React from "react";
import { useDispatch } from "react-redux";
import { reportReview } from "../../../actions";
import "./Comment.css"

function Comment({ titulo, descripcion, calificacion, id }) {
   const dispatch = useDispatch()
   function handlerSubmit(e) {
      dispatch(reportReview({ id: id }))
   }
   return (
      <div className="comment-ind">
         <div className="comment-title">
            <h4>{titulo}</h4>
            <button onClick={(e) => handlerSubmit(e)}> 🚩</button>
         </div>
         <p>{descripcion}</p>
         <span>{calificacion} ⭐</span>
      </div>)
}

export default Comment