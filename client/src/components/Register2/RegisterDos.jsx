import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
import Auth0 from "../Auth0/Auth0";

export const RegisterDos = () => {
  let [input, setInput] = useState({ name: "", email: "", password: "" });
  let [error, setError] = useState({ name: "", email: "", password: "" });
  let [home, setHome] = useState(false);
  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    //validaciones

    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }
  function crearUsuario(e) {
    e.preventDefault();
    let datos = {
      nombre: input.name,
      email: input.email,
      password: input.password,
    };
    let url = "http://localhost:5685/auth/signup";
    let status;
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(datos),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((respuesta) => {
        console.log(respuesta, status);
        if (status === 200) {
          setHome(true);
          alert(`User whit name ${input.name} was created successfully`);
        } else {
          alert(respuesta.msj);
        }
      })
      .catch((error) => console.error(error));
  }
  if (home == true) {
    return <Redirect to="/Login" />;
  }
  function validate(input) {
    let error = {};
    //name
    if (!input.name) {
      error.name = "nombre de usuario es requerido";
    } else if (!/^[\s\S]{3,100}$/.test(input.name)) {
      error.name = "NOMBRE debe tener mas de 3 letras";
    }
    //correo

    if (!input.email) {
      error.email = "email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      error.email = "formato de email no valido";
    }

    //password
    if (!input.password) {
      error.password = "password es requerido";
    }
    return error;
  }
  return (
    <>
      <form className="Register">
        <div className="Register-content">
          <div className="Login-home-container">
            <Link to="/home">
              <button className="Login-home__btn">
                <AiFillHome />
                <span>Home</span>
              </button>
            </Link>
          </div>
          <h1>Register</h1>
          <div className="Register-form">
            <div
              className={
                error.name ? "danger Register-input" : "Register-input"
              }
            >
              {error.name ? (
                <label htmlFor="name">*Name:</label>
              ) : (
                <label htmlFor="name">Name:</label>
              )}

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div
              className={
                error.email ? "danger Register-input" : "Register-input"
              }
            >
              {error.email ? (
                <label htmlFor="name">*Email:</label>
              ) : (
                <label htmlFor="name">Email:</label>
              )}
              <input
                type="email"
                placeholder="email"
                name="email"
                value={input.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div
              className={
                error.password ? "danger Register-input" : "Register-input"
              }
            >
              {error.password ? (
                <label htmlFor="name">*Password:</label>
              ) : (
                <label htmlFor="name">Password:</label>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              {!Object.keys(error).length > 0 ? (
                <>
                  <button
                    className="Register-create__btn"
                    onClick={(e) => crearUsuario(e)}
                  >
                    <Link to="/home"></Link>Create User
                  </button>
                </>
              ) : (
                <p className="errores">
                  los espacios con * tienen errores por corregir
                </p>
              )}
            </div>
          </div>

          <div className="Register-google">
            <p>or</p>
            <Auth0 />
          </div>
        </div>
      </form>
    </>
  );
};
