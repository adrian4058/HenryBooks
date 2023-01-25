import  {  useFormik }  from "formik";
import * as Yup from 'yup'

const Login = () => {
    const {handleSubmit, getFieldProps, errors} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
            .email('Should be a valid email')
            .required('Required'),
            password: Yup.string()
            .min(6, 'Min. 6 characters')
            .required('Required'),
        })
    })


    return (
        <Form >
            <label htmlFor="email">E-mail:</label>
            <input type='email'
                placeholder='E-mail'
                {...getFieldProps('email')}
    
                className={`${(touched.email && errors.email) && 'error_input'}`}
            />
            {(touched.email && errors.email) && <span className='error'>{errors.email}</span>}
            
            
            <label htmlFor="password">Password:</label>
            <input type="password"
                placeholder='Password'
                {...getFieldProps('password')}
                
                className={`${(touched.password && errors.password) && 'error_input'}`}
            />
            {(touched.password && errors.password) && <span className='error'>{errors.password}</span>}


            <div>
                <button className="botsub" type="submit" onSubmit={handleSubmit}>Log In</button>
            </div>

            <p>
                Don't have any account?<Link to="/register"> Register here! </Link>

            </p>
        </Form>
    )
}