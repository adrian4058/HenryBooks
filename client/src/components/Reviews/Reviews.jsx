import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../actions/index";
import "./Reviews.css";
import Comments from "./Review Components/Comments";

function Reviews({ LibroId, commentsReview }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile);
  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      calificacion: 0,
    },
    validationSchema: Yup.object({
      titulo: Yup.string()
        .max(28, "Debe tener 28 caracteres o menos")
        .min(10, "Debe tener más de 10 caracteres")
        .required("Requerido"),
      descripcion: Yup.string()
        .max(90, "Debe tener 90 caracteres o menos")
        .min(15, "Debe tener más de 15 caracteres")
        .required("Requerido"),
      calificacion: Yup.number("Tiene que ser un número")
        .required("Número entre 1 y 5")
        .positive("Debe estar calificado")
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
            <span>¿Lo leíste?</span>
            <span>¡Puedes calificarlo!</span>
          </h3>

          <div className="div-review">
            <label htmlFor="titulo">Título de la reseña</label>
            <input
              id="titulo"
              type="text"
              className="Review__input"
              {...formik.getFieldProps("titulo")}
            />

            {formik.touched.titulo && formik.errors.titulo ? (
              <div className="error-message">{formik.errors.titulo}</div>
            ) : null}
          </div>

          <div className="div-review">
            <label htmlFor="descripcion">Descripción</label>
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
            <label htmlFor="calificacion">Calificación</label>
            <input
              className="Review-input__range"
              id="calificacion"
              type="range"
              min="0"
              max="5"
              step="1"
              {...formik.getFieldProps("calificacion")}
            />
            <div className="Range-value">
              Puntaje: {formik.values.calificacion}
            </div>
            {formik.touched.calificacion && formik.errors.calificacion ? (
              <div className="error-message">{formik.errors.calificacion}</div>
            ) : null}
          </div>

          <button className="Review-send__btn" type="submit">
            Enviar
          </button>
        </div>
      </form>
      
      <Comments commentsReview={commentsReview} />
      
    </div>
  );
}

export default Reviews;
