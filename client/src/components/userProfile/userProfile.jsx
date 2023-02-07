import React, {useEffect} from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser} from "../../actions";
import NavBar from "../Navbar/Navbar";
import "./userProfile.css";
import Modal from "react-modal"
import { countries } from "../../utils/countries"

// import Api from "../Global";
// const url = Api.Url;

export default function UserProfile () {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userProfile);
    const message = useSelector(state => state.message)
    

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
      dispatch(getUser());
    }, [dispatch]);


    const openEditModal = () => {
      setModalIsOpen(true);
    }
  
    const closeEditModal = () => {
      setModalIsOpen(false);
      
    }


    const [editUser, setEditUser] = useState({
      
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      direccion: user.direccion,
      pais: user.pais,
      ciudad: user.ciudad,
      
    });

    const handleUpdateForm = (e) => {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value
      })
    };

    const handleSubmitUpdate = (e) => {
      e.preventDefault();
      if (editUser.name === "" || editUser.email === "" || editUser.password === "")
        return alert('This fields cannot be empty')
      dispatch((updateUser(user.id, editUser)))
      // window.location.reload()
     
    }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    // setAuth(false);
  };
  

  const imagedefault = "https://thumbs.dreamstime.com/z/icono-del-usuario-en-estilo-plano-de-moda-aislado-fondo-gris-s%C3%ADmbolo-123663211.jpg"



return (
    
        <div className="info">
          <NavBar />
          <div className="alldata">
          <div className="headatos">
            <h3 className="tituloAccount"> Datos personales </h3>
           
          </div>

          <div className="usuario">
            <div className="usuarioimg">
              <img
                className="datoimg"
                name="image"
                value={user.image}
                src={user.image? user.image : imagedefault}
                width="120px"
              ></img>
            </div>
            <div>
            <h3 className="dato" name="id" value={user.id}>
                {" "}
                ID: {user.id}{" "}
              </h3>

              <h3 className="dato" name="name" value={user.nombre}>
                {" "}
                Name: {user.nombre}{" "}
              </h3>
            
              <h3 className="dato" name="email" value={user.email}>
                
                {" "}
                Mail: {user.email}{" "}
              </h3>
              <h3 className="dato" name="password" value={user.password}>
                {" "}
                Password: **********{" "}
              </h3>
              <h3 className="dato" name="direccion" value={user.direccion}>
                {" "}
                Address: {user.direccion}{" "}
              </h3>
              <h3 className="dato" name="pais" value={user.pais}>
                {" "}
                Country: {user.pais}{" "}
              </h3>
              <h3 className="dato" name="ciudad" value={user.ciudad}>
                {" "}
                City/State: {user.ciudad}{" "}
              </h3>
            </div>
          </div>
          <button className="logoutBtn" onClick={(e) => logout(e)}>
            Logout
          </button>
        </div>
        <button  onClick={openEditModal}>Edit profile</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeEditModal}
            ariaHideApp={false}
            className="modal-form"
          >
            <form className="BC-CreateBooks" onSubmit={handleSubmitUpdate}>
            
              <div className="BC-CreateBooks-input">
                <label>Name: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="nombre"
                  value={editUser.nombre}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Email: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="email"
                  value={editUser.email}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Password: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="password"
                  value={editUser.password}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Address: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="direccion"
                  value={editUser.direccion}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Country: </label>
                <select
                  className="Input-CreateBooks"
                  type="text"
                  name="pais"
                  value={editUser.pais}
                  onChange={handleUpdateForm} >
                    <option> </option>
                    {countries.map((data) => (
                      <option value={data.id}>{data.name_es}</option>
                    ))}
                  </select>
              </div>
              <div className="BC-CreateBooks-input">
                <label>City: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="ciudad"
                  value={editUser.ciudad}
                  onChange={handleUpdateForm}
                >

                </input>
              </div>
              {/* <input className="input-btn-dash-form" type="submit" value="Edit User" /> */}
              <button onClick={(e) => handleSubmitUpdate(e)}> Edit User</button>

              {
                message.length ? <div>Profile Edited Succesfully</div> : null
              }
              </form>
              </Modal>
        </div>
  );
}
