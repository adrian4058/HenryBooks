import React from "react";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { cleanReview } from "../../../actions";
import "./Comments.css";

function Comments({ commentsReview }) {
const reviews = useSelector(state=> state.reviews)
const dispatch = useDispatch()
React.useEffect(() =>{
    return ()=>{
        dispatch(cleanReview())
    }
},[dispatch])

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
            {reviews.msj && <h3>{reviews.msj}</h3>}
        </div>)
}

export default Comments