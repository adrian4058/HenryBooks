import React from "react";
import Comment from "./Comment";
import "./Comments.css";

function Comments({ commentsReview }) {
    return (
        <div className="comments">
            {commentsReview?.length ? <h2>Comments:</h2> : <h2>No comments</h2>}
            {!!commentsReview &&
                commentsReview.map(elem =>
                    <div className="Comments-flex" key={elem.id}>
                        <Comment
                            key={elem.id}
                            id={elem.id}
                            calificacion={elem.calificacion}
                            titulo={elem.titulo}
                            descripcion={elem.descripcion}
                        />
                    </div>
                )
            }
            {commentsReview?.length === 0 ? <h2 className="No-comments">Be the first to comment</h2> : null}
        </div>)
}

export default Comments