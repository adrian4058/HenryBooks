import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
//import GoogleRegister from "../GoogleRegister/GoogleRegister";
import "./Register.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../Global";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const cookie = new Cookies();
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);
  const {
    handleSubmit,
    touched,
    getFieldProps,
    errors,
    handleChange,
  } = useFormik({
    initialValues: {
      nombre: "",
      //lastname: "",
      email: "",
      password: "",
      rol: "",
    },

    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Must have more than 3 characters")
        .max(15, "Less than 15 characters")
        .matches(/^[aA-zZ\s]+$/, "Only valid characaters")
        .required("Invalid field"),
      // lastname: Yup.string()
      //   .min(3, "Must have more than 3 characters")
      //   .matches(/^[aA-zZ\s]+$/, "Only valid characaters")
      //   .required("Required"),
      email: Yup.string()
        .email("Should be a valid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Min. 6 characters")
        .required("Required"),
      // rol: Yup.string()
      // .required('Required')
    }),

    onSubmit: async (values) => {
      const data = {
        nombre: values.nombre,
        //lastname: values.lastname,
        email: values.email,
        password: values.password,
      };
      console.log(values);
      console.log(data);
      try {
        const response = await fetch(Api.Url + "/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const parseRes = await response.json();

        localStorage.setItem("token", parseRes.token);
        console.log(data.nombre);
        cookie.set("nombre", data.nombre, { path: "/" });
        cookie.set("email", data.email, { path: "/" });
        window.location.href = "./login";
        alert("se envio email con 'data'");
        //return parseRes;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <form className="Register" noValidate onSubmit={handleSubmit}>
      <div className="Register-content">

        <div className="Login-home-container">
          <Link to="/home">
            <button className="Login-home__btn">
              <AiFillHome />
              <span>
                Home
              </span>
            </button>
          </Link>
        </div>

        <h1>Register</h1>

        <div className="Register-form">
          <div className="Register-input">
            <label htmlFor="nombre">Name:</label>
            <input
              type="text"
              placeholder="Nombre"
              {...getFieldProps("nombre")}
              className={`Login-Register__input ${touched.nombre &&
                errors.nombre &&
                "error_input"}`}
            />
            <div className="adv">
              {touched.nombre && errors.nombre && (
                <span className="error">{errors.nombre}</span>
              )}
            </div>
          </div>

          {/* <label htmlFor="lastname">Lastname:</label>
              <input
                type="text"
                placeholder="Lastname"
                {...getFieldProps("lastname")}
                className={`${
                  touched.lastname && errors.lastname && "error_input"
                }`}
              />
              <div className="adv">
                {touched.lastname && errors.lastname && (
                  <span className="error">{errors.lastname}</span>
                )}
              </div> */}
          <div className="Register-input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="E-mail"
              {...getFieldProps("email")}
              className={`Login-Register__input ${touched.email && errors.email && "error_input"}`}
            />
            <div className="adv">
              {touched.email && errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="Register-input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              {...getFieldProps("password")}
              className={`Login-Register__input ${touched.password &&
                errors.password &&
                "error_input"}`}
            />
            <div className="adv">
              {touched.password && errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="Register-input">
            <label htmlFor="rol">Select an option:</label>
            <select className="Register-input__select" id="rol" onChange={handleChange}>
              <option className="Register-input__option" value="">--- Select ---</option>
              <option className="Register-input__option" value="admin">Admin</option>
              <option className="Register-input__option" value="user">User</option>
            </select>
          </div>

          {touched.rol && errors.rol && (
            <span className="error">{errors.rol}</span>
          )}

          <div>
            <button className="Register-create__btn" type="submit">
              Create User
            </button>
          </div>
        </div>

        <p>Or</p>

        {/* <GoogleRegister /> */}
        <div className="Register-google">
          {isAuthenticated ? (
            <button
              className="navbar-btn__option"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          ) : (
            <button
              className="Login-google__btn"
              onClick={() => loginWithPopup()}
            >
              <FcGoogle />
              <span>
                Continue With Google
              </span>
            </button>

          )}
        </div>
      </div>
    </form >
  );
};

export default Register;
