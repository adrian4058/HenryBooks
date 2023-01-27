import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { addReview } from '../../actions/index'
import './Reviews.css'

function Reviews (props){
           const dispatch = useDispatch()
           const formik = useFormik({
                initialValues: {
                  titulo: '',
                  descripcion: '',
                  calificacion: 0,
                },
                validationSchema: Yup.object({
                  titulo: Yup.string()
                    .max(25, 'Must be 25 characters or less')
                    .min(10, 'Must be bigger than 10 characters')
                    .required('Required'),
                  descripcion: Yup.string()
                    .max(40, 'Must be 40 characters or less')
                    .min(15, 'Must be bigger than 15 characters')
                    .required('Required'),
                    calificacion: Yup.number('must be a number')
                    .required('Number between 1 and 5')
                    .positive("Must be qualified")
                    .integer(),
                }),
                onSubmit: values => {
                  dispatch(addReview({...values, UsuarioId: 1, LibroId: 2}))
                },
              });
              return (
           <form onSubmit={formik.handleSubmit}>
               <div className="review-container">
                  <div className="div-review">
                   <label htmlFor="titulo">Title</label>
                   <input
                    id="titulo"
                    type="text"
                    {...formik.getFieldProps("titulo")}
                   />
                  
                   {formik.touched.titulo && formik.errors.titulo ? (
                    <div className="error-message">{formik.errors.titulo}</div>
                  ) : null}
                 </div> 
                 <div className="div-review">
                    <label htmlFor="descripcion">Description</label>
                   <input id="descripcion" type="text" {...formik.getFieldProps("descripcion")} />
                   {formik.touched.descripcion && formik.errors.descripcion ? (
                    <div className="error-message">{formik.errors.descripcion}</div>
                    ) : null}
                 </div>
                 <div className="div-review">
                   <label htmlFor="calificacion">Qualification</label>
                   <input className="input-range" id="calificacion" type="range" min="0" max="5" step="1" {...formik.getFieldProps('calificacion')} />
                   {formik.touched.calificacion && formik.errors.calificacion ? (
                    <div className="error-message">{formik.errors.calificacion}</div>
                    ) : null}
                 </div> 
        
                  <button className="sendReview" type="submit">Send</button>
             </div>
           </form>
              );
        
 };
        


export default Reviews