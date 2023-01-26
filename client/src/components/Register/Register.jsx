import  { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import GoogleRegister from "../GoogleRegister/GoogleRegister";
import "./Register.css"


const Register = () => {
    const {handleSubmit, touched, getFieldProps, errors, handleChange} = useFormik({
        initialValues: {
            name:'',
            lastname: '',
            email: '',
            password: '',
            rol: '',
         },
         
         validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must have more than 3 characters')
            .max(15, 'Less than 15 characters')
            .matches(/^[aA-zZ\s]+$/, 'Only valid characaters')
            .required('Invalid field'),
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
            // rol: Yup.string()
            // .required('Required')      

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
        <div className='register'>
          <div className='all-content'>
            <div className='register-container'>
              <h1>Register here!</h1>
            <div className='content'>
            <label htmlFor="name">Name:</label>
            <input type="text"
                placeholder='Name'
                {...getFieldProps('name')}

                className={`${(touched.name && errors.name) && 'error_input'}`}
            />
            <div className='adv'>
            {(touched.name && errors.name) && <span className='error'>{errors.name}</span>}
            </div>
            <label htmlFor="lastname">Lastname:</label>
            <input type='text'
                placeholder='Lastname'
                {...getFieldProps('lastname')}
                
                className={`${(touched.lastname && errors.lastname) && 'error_input'}`}
            />
            <div className='adv'>
            {(touched.lastname && errors.lastname) && <span className='error'>{errors.lastname}</span>}
            </div>
            <label htmlFor="email">Email:</label>
            <input type='email'
                placeholder='E-mail'
                {...getFieldProps('email')}
    
                className={`${(touched.email && errors.email) && 'error_input'}`}
            />
            <div className='adv'>
            {(touched.email && errors.email) && <span className='error'>{errors.email}</span>}
            </div>
            <label htmlFor="password">Password:</label>
            <input type="password"
                placeholder='Password'
                {...getFieldProps('password')}
                
                className={`${(touched.password && errors.password) && 'error_input'}`}
            />
            <div className='adv'>
            {(touched.password && errors.password) && <span className='error'>{errors.password}</span>}
            </div>
            <div>
                    <label htmlFor="rol">Select an option:</label>

                    <select id="rol" onChange={handleChange} >
                        <option value="">--- Select ---</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        
                    </select>
           </div>
           {/* </div>
        </div> */}
        
            {(touched.rol && errors.rol) && <span className="error">{errors.rol}</span>}
            
                    <div>
                    <button className="botsub" type="submit">Create User</button>
                    </div>
            </div>
 
              </div>

                <div>
                    <p>Or</p>
                <GoogleRegister />
                </div>
                  <div className="navbar-options__link">
                  <Link to="/home">
                      <button className="form-btn">
                          <b>Home</b>
                      </button>
                  </Link>
                  </div>
        </div>
      </div>     
      </form>
    )
}


export default Register;
