import React from "react";
import Comment from "./Comment";
import "./Comments.css"; 

function Comments({commentsReview}){
    return(
    <div className="comments">
        {commentsReview? <h2>Comments:</h2>: null}
        {!!commentsReview && commentsReview.map(elem=> <Comment calificacion={elem.calificacion} titulo={elem.titulo} descripcion={elem.descripcion}/>)}
        {!commentsReview && <h3>No comments</h3>}
        
       

    </div>)
}

export default Comments