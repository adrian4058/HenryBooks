import React, {useEffect} from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { getUser, updateUser } from "../../actions";
import NavBar from "../Navbar/Navbar";
import "./userProfile.css";
import Modal from "react-modal"


// import Api from "../Global";
// const url = Api.Url;

export default function UserProfile (props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userProfile);
    const message = useSelector((state => state.message))

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
      dispatch(getUser());
    }, [dispatch]);


    const openEditModal = () => {
      setModalIsOpen(true);
    }
  
    const closeEditModal = () => {
      setModalIsOpen(false);
      // dispatch(emptyMessage());
      // window.location.reload();
    }


    const [editUser, setEditUser] = useState({
      nombre: props.nombre,
      email: props.email,
      password: props.password,
      address: props.direccion,
      pais: props.pais,
      ciudad: props.ciudad,
      
    });

    const handleUpdateForm = (e) => {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value
      })
    };

    const handleSubmitUpdate = (e) => {
      e.preventDefault()
      dispatch((updateUser(props.id, editUser)))
    }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    // setAuth(false);
  };
  // function handleEdit() {
  //   window.location.assign("http://localhost:3000/profile/edit");
  // }
  

return (
    
        <div className="info">
          <NavBar />
          <div className="alldata">
          <div className="headatos">
            <h3 className="tituloAccount"> Datos personales </h3>
            {/* <Link to="/profile/edit">
              {" "}
              Editar datos{" "}
            </Link> */}
          </div>

          <div className="usuario">
            {/* <div className="usuarioimg">
              <img
                className="datoimg"
                name="image"
                value={user.image}
                src={user.image? user.image : imagedefault}
                width="120px"
              ></img>
            </div> */}
            <div>
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
        <button  onClick={openEditModal}>Edit Properties</button>
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
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="pais"
                  value={editUser.pais}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>City: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="ciudad"
                  value={editUser.ciudad}
                  onChange={handleUpdateForm}
                />
              </div>
              <input className="input-btn-dash-form" type="submit" value="Edit User" />
              {
                message.length ? <div>Profile Edited Succesfully</div> : null
              }
              </form>
              </Modal>
        </div>
  );
}
