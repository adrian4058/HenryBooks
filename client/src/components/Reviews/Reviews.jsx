import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { addReview } from '../../actions/index'

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
                  dispatch(addReview({...values, UsuarioId: 1, LibroId: 1}))
                },
              });
              return (
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="titulo">Title</label>
                  <input
                    id="titulo"
                    type="text"
                    {...formik.getFieldProps("titulo")}
                  />
                  {formik.touched.titulo && formik.errors.titulo ? (
                    <div>{formik.errors.titulo}</div>
                  ) : null}
            
                  <label htmlFor="descripcion">Description</label>
                  <input id="descripcion" type="text" {...formik.getFieldProps("descripcion")} />
                  {formik.touched.descripcion && formik.errors.descripcion ? (
                    <div>{formik.errors.descripcion}</div>
                  ) : null}
            
                  <label htmlFor="calificacion">Qualification</label>
                  <input id="calificacion" type="range" min="0" max="5" step="1" {...formik.getFieldProps('calificacion')} />
                  {formik.touched.calificacion && formik.errors.calificacion ? (
                    <div>{formik.errors.calificacion}</div>
                  ) : null}
        
                  <button type="submit">Submit</button>
                </form>
              );
        
 };
        


export default Reviews