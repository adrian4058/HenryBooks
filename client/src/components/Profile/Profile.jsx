// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { useState } from "react";




 const Edit = () => {

//         // FALTA ACTION QUE TRAIGA LOS USUARIOS
//     // useEffect(() => {
//     //     dispatch(getUsers())
//     // }, [dispatch])

//     const [updateAccount, setUpdateAccount] = useState({});

//     const handleSubmit = (e) => {
//         e.preventDefault();
       
//         setUpdateAccount({
//             ...updateAccount,
//             [e.target.name]: e.target.value,
//             // [e.target.lastName]: e.target.value,
//             [e.target.mail]: e.target.value,
//             [e.target.password]: e.target.value,
            
//         })
       
//         console.log(updateAccount)
        
//     }


//     function handleUpdate(e) {
//         e.preventDefault();
//         // dispatch(updateUser(user.id, updateAccount));  FALTA LAS ACTIONS Y RUTA DE USUARIOS
//         // history.push("/account")
//         window.location.href = window.location.href
//     }



    return (  
    
    <div>
    <form className='editForm' >
                    <h3>Editar información personal</h3>
                    <div>
                        <label> Nombre: </label>
                        <input type="text" name="name" placeholder="Name"   />
                    </div>

                    <div>
                        <label> Apellido: </label>
                        <input type="text" name="lastName" placeholder="Lastname"  />
                    </div>

                    <div>
                        <label> Mail: </label>
                        <input type='email' name="email" placeholder="New Email"  />
                    </div>

                    <div>
                        <label> Contraseña: </label>
                        <input type='password' name="password" placeholder="New password"  />
                    </div>
                    

                    <button className="guardarBtn" > Guardar Cambios </button>
                </form>

            </div>
        
    )
}


export default Edit