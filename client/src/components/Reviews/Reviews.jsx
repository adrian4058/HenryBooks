import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../actions/index";
import "./Reviews.css";
import Comments from "./Review Components/Comments";
import { useState } from "react";

function Reviews({ LibroId, commentsReview }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews)
  const user = useSelector(state => state.userProfile)
  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      calificacion: 0,
    },
    validationSchema: Yup.object({
      titulo: Yup.string()
        .max(28, "Must be 28 characters or less")
        .min(10, "Must be bigger than 10 characters")
        .required("Required"),
      descripcion: Yup.string()
        .max(90, "Must be 90 characters or less")
        .min(15, "Must be bigger than 15 characters")
        .required("Required"),
      calificacion: Yup.number("must be a number")
        .required("Number between 1 and 5")
        .positive("Must be qualified")
        .integer(),
    }),
    onSubmit: (values) => {
      dispatch(addReview({ ...values, UsuarioId: user.id, LibroId: LibroId }));
    },
  });

  return (
    <div className="Reviews">
      <form onSubmit={formik.handleSubmit} className="Reviews-form">
        <div className="Review-container">
          <h3>
            <span>Did you read it?</span>
            <span>You can qualify it!</span>
          </h3>

          <div className="div-review">
            <label htmlFor="titulo">Title of review</label>
            <input
              id="titulo"
              type="text"
              className="Review__input"
              {...formik.getFieldProps("titulo")} />

            {formik.touched.titulo && formik.errors.titulo ? (
              <div className="error-message">{formik.errors.titulo}</div>
            ) : null}
          </div>

          <div className="div-review">
            <label htmlFor="descripcion">Description</label>
            <input
              id="descripcion"
              type="text"
              className="Review__input input-desc"
              {...formik.getFieldProps("descripcion")}
            />
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className="error-message">{formik.errors.descripcion}</div>
            ) : null}
          </div>

          <div className="div-review">
            <label htmlFor="calificacion">Qualification</label>
            <input
              className="Review-input__range"
              id="calificacion"
              type="range"
              min="0"
              max="5"
              step="1"
              {...formik.getFieldProps("calificacion")}
            />
            <div className="Range-value">Rating: {formik.values.calificacion}</div>
            {formik.touched.calificacion && formik.errors.calificacion ? (
              <div className="error-message">{formik.errors.calificacion}</div>
            ) : null}
          </div>

          <button className="Review-send__btn" type="submit">
            Send
          </button>

        </div>
      </form>
      {reviews.success ? <h3>{reviews.success}</h3>: null}
      <Comments commentsReview={commentsReview} />
    </div>
  );
}

export default Reviews;
