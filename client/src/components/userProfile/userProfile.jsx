import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  updateUser, deletToken, vaciarUsuario } from "../../actions";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./userProfile.css";
import Modal from "react-modal";
import { countries } from "../../utils/countries";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

export default function UserProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile);
  
  
  const message = useSelector((state) => state.message);
  const { logout } = useAuth0();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(getUser(profile.id));
  // }, [dispatch]);

  const openEditModal = () => {
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
  };

  const [editUser, setEditUser] = useState({
  nombre: profile.nombre,
  email: profile.email,
  password: profile.password,
  direccion: profile.direccion || "",
  pais: profile.pais || "",
  ciudad: profile.ciudad || "",
});


  const handleUpdateForm = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (
      editUser.name === "" ||
      editUser.email === "" ||
      editUser.password === ""
    ) {
      return alert("This fields cannot be empty");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User edited successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    dispatch(updateUser(profile.id, editUser));
    closeEditModal();
    // window.location.reload()
  };

  const logOut = (e) => {
    e.preventDefault();
    dispatch(vaciarUsuario());
    dispatch(deletToken());
    localStorage.clear();
    logout();
  };

  return (
    <div className="Profile Container">
      <NavBar />
      <div className="Profile-user-total">
        <div className="Profile-user__content">
          <div className="headatos">
            <h3 className="tituloAccount">Personal Info</h3>
          </div>

          <div className="Profile-user">
            <div className="Profile-user__img">
              <img
                className="datoimg"
                name="image"
                value={profile.img}
                src={profile.img}
                width="120px"
                alt="avatar"
              />
            </div>
            <div className="Profile-user__info">
              <div className="Profile-usuario__data">
                <h5 className="Profile-info" name="name" value={profile.nombre}>
                  <span>Name:</span>
                  <span className="Profile-data">{profile.nombre}</span>
                </h5>
              </div>

              <div className="Profile-usuario__data">
                <h5 className="Profile-info" name="email" value={profile.email}>
                  <span>Email:</span>
                  <span className="Profile-data">{profile.email}</span>
                </h5>
              </div>

              <div className="Profile-usuario__data">
                <h5 className="Profile-info" name="password" value={profile.email}>
                  <span>Password:</span>
                  <span className="Profile-data">**********</span>
                </h5>
              </div>

              <div className="Profile-usuario__data">
                <h5
                  className="Profile-info"
                  name="direccion"
                  value={profile.direccion}
                >
                  <span>Address:</span>
                  <span className="Profile-data">{profile.direccion}</span>
                </h5>
              </div>

              <div className="Profile-usuario__data">
                <h5 className="Profile-info" name="pais" value={profile.pais}>
                  <span>Country:</span>
                  <span className="Profile-data">{profile.pais}</span>
                </h5>
              </div>

              <div className="Profile-usuario__data">
                <h5 className="Profile-info" name="ciudad" value={profile.ciudad}>
                  <span>City/State:</span>
                  <span className="Profile-data">{profile.ciudad}</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="Profile-btns">
            <button className="Profile-btn" onClick={openEditModal}>
              Edit profile
            </button>
            <button className="Profile-btn" onClick={(e) => logOut(e)}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeEditModal}
        ariaHideApp={false}
        className="modal-form"
      >
        <form className="BC-CreateBooks" onSubmit={handleSubmitUpdate}>
          <div className="Register-input">
            <label>Name: </label>
            <input
              className="Login-Register__input"
              type="text"
              name="nombre"
              value={editUser.nombre}
              onChange={handleUpdateForm}
            />
          </div>
          <div className="Register-input">
            <label>Email: </label>
            <input
              className="Login-Register__input"
              type="text"
              name="email"
              value={editUser.email}
              onChange={handleUpdateForm}
            />
          </div>
          <div className="Register-input">
            <label>Password: </label>
            <input
              className="Login-Register__input"
              type="text"
              name="password"
              value={editUser.password}
              onChange={handleUpdateForm}
            />
          </div>
          <div className="Register-input">
            <label>Address: </label>
            <input
              className="Login-Register__input"
              type="text"
              name="direccion"
              value={editUser.direccion}
              onChange={handleUpdateForm}
            />
          </div>
          <div className="Register-input">
            <label>Country: </label>
            <select
              className="Register-input__select"
              type="text"
              name="pais"
              value={editUser.pais}
              onChange={handleUpdateForm}
            >
              <option key="" value="">
                {" "}
              </option>
              {countries.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.name_es}
                </option>
              ))}
            </select>
          </div>
          <div className="Register-input">
            <label>City: </label>
            <input
              className="Login-Register__input"
              type="text"
              name="ciudad"
              value={editUser.ciudad}
              onChange={handleUpdateForm}
            ></input>
          </div>
          {/* <input className="input-btn-dash-form" type="submit" value="Edit User" /> */}
          <button
            className="Register-create__btn"
            onClick={(e) => handleSubmitUpdate(e)}
          >
            {" "}
            Edit User
          </button>

          {message.length ? <div>Profile Edited Succesfully!!</div> : null}
        </form>
      </Modal>
      <Footer />
    </div>
  );
}
