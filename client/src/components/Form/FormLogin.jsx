import useFormik from 'formik'
import * as Yup from 'yup'

const Formulario = () => {
    const {values, handleChange, touched, handleSubmit, errors} = useFormik({
        initialValues: {
            firstname:'',
            lastname: '',
            email: '',
            password: '',
            rol: '',
         },
         
         validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must have more than 3 characters')
            .matches(/^[aA-zZ\s]+$/, 'Only valid characaters')
            .required('Required'),
            lastname: Yup.string()
            .min(3, 'Must have more than 3 characters')
            .matches(/^[aA-zZ\s]+$/, 'Only valid characaters')
            .required('Required'),
            email: Yup.string()
            .email('Should be a valid email')
            .required('Required'),
            password: Yup.string()
            .min(6, 'Min. 6 characters')
            .required('Required'),
            rol: Yup.string()
            .required('Required')      

         }),

         onSubmit: values => {
            const data = {
                name: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password
            }
            console.log(data);
         },
    })


    return (
        <form noValidate onSubmit={handleSubmit}>
            <input type="text"
                placeholder='Name'
                label="Name"
                onChange={handleChange}
                value={values.name}
                className={`${(touched.name && errors.name) && 'error_input'}`}
            />
            {(touched.name && errors.name) && <span className='error'>{errors.name}</span>}
            <input type='text'
                placeholder='Lastname'
                label='Lastname'
                onChange={handleChange}
                value={values.lastname}
                className={`${(touched.lastname && errors.lastname) && 'error_input'}`}
            />
            {(touched.lastname && errors.lastname) && <span className='error'>{errors.lastname}</span>}
            <input type='email'
                placeholder='E-mail'
                label='E-mail'
                onChange={handleChange}
                value={values.email}
                className={`${(touched.email && errors.email) && 'error_input'}`}
            />
            {(touched.email && errors.email) && <span className='error'>{errors.email}</span>}
            <input type="password"
                placeholder='Password'
                label='Password'
                onChange={handleChange}
                value={values.password}
                className={`${(touched.password && errors.password) && 'error_input'}`}
            />
            {(touched.password && errors.password) && <span className='error'>{errors.password}</span>}
            <div>
                    <label htmlFor="rol">Select an option:</label>

                    <select id="rol" onChange={handleChange} >
                        <option value="">--- Select ---</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        
                    </select>
            </div>
            {(touched.rol && errors.rol) && <span className="error">{errors.rol}</span>}

            <div>
                    <button className="botsub" type="submit">Create User</button>
            </div>


        </form>
    )
}


export default Formulario;