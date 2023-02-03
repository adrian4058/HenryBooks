
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { getUser, updateUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { countries } from "../../utils/countries"



 const Edit = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.user)
   
   
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const [updateAccount, setUpdateAccount] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
       
        setUpdateAccount({
            ...updateAccount,
            [e.target.nombre]: e.target.value,
            [e.target.mail]: e.target.value,
            [e.target.password]: e.target.value,
            [e.target.direccion]: e.target.value,
            [e.target.pais]: e.target.value,
            [e.target.ciudad]: e.target.value,

            
        })
       
        console.log(updateAccount)
        
    }


    function handleUpdate(e) {
        e.preventDefault();
        dispatch(updateUser(user.id, getUser)); 
        history.push("/profile")
        window.location.href = window.location.href
    }


  ///////////////////////// FALTA CONECTAR LA INFO DE LOS PAISES PARA SELECCIONAR
    return (  
    
    <div>
    <form className='editForm' >
                    <h3>Editar información personal</h3>
                    <div>
                        <label> Name: </label>
                        <input type="text" name="name" placeholder="Name" value={updateAccount.nombre} onChange={handleSubmit}  />
                    </div>

                    <div>
                        <label> Mail: </label>
                        <input type='email' name="email" placeholder="New Email" value={updateAccount.mail} onChange={handleSubmit}/>
                    </div>

                    <div>
                        <label> Password: </label>
                        <input type='password' name="password" placeholder="New password" value={updateAccount.password} onChange={handleSubmit}/>
                    </div>
                    <div>
                        <label> Address: </label>

                        <input type='text' name="direccion" placeholder="Address(optional)" value={updateAccount.direccion} onChange={handleSubmit} />
                    </div>
                    <div>
                        <label> Country: </label>
                        <select type='text' name="pais" placeholder="Country(optional)" value={updateAccount.pais} onChange={handleSubmit}>
                        <option value="vacio"> </option>
                        <option value={"Argentina"}>Argentina </option>
                        <option value={"Brasil"}>Brasil </option>
                        <option value={"Colombia"}>Colombia </option>
                        <option value={"Chile"}>Chile </option>
                        <option value={"Paraguay"}>Paraguay </option>
                        <option value={"Peru"}>Peru </option>
                        <option value={"Uruguay"}>Uruguay </option>
                        <option value={"Venezuela"}>Venezuela </option>
                    
                    </select>
                    </div> 
                    <div>
                        <label> City: </label>
                        <input type='text' name="ciudad" placeholder="City(opitional)" value={updateAccount.ciudad} onChange={handleSubmit} />
                    </div>
                    

                    <button className="guardarBtn" onClick={handleUpdate}> Save changes </button>
                </form>

            </div>
        
    )
}


export default Edit