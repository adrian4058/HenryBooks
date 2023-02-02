import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
//import LoginGoogle from "../GoogleLogin/GoogleLogin";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../Global";
import * as actions from '../../actions/index'
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);
  const cookie = new Cookies();
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Should be a valid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Min. 6 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      console.log(values);
      console.log(data);
      const response = await fetch(Api.Url + "/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      console.log("trae respuesta", parseRes);
      dispatch(actions.putToken(parseRes.token))
      cookie.set("email", data.email, { path: "/" });
      alert(`welcome ${data.email.split("@")[0]}`);
      // window.location.href = "./home";


    },
  });

  return (
    <form className="Login" noValidate onSubmit={handleSubmit}>
      <div className="Login-content">

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

        <h1>Login</h1>

        <div className="Login-form">

          <div className="Login-input">
            <label htmlFor="email">E-mail:</label>
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

          <div className="Login-input">
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

          <Link to='/home'>
            <button type="submit" className="Login-login__btn"><AiOutlineLogin />Log In</button>
          </Link>
        </div>

        <p className="Login-noaccount">
          Don't have any account?
          <Link to="/register">
            <span className="Login-register__link">Register here!</span>
          </Link>
        </p>
        <p>Or</p>

        {/* <LoginGoogle /> */}

        <div className="Login-google">
          {isAuthenticated ? (
            <button
              className="Login-google__btn"
              onClick={() =>
                logout({ returnTo: window.location.origin })
              }
            >
              <FcGoogle />
              <span>
                Logout
              </span>
            </button>
          ) : (
            <button
              className="Login-google__btn"
              onClick={() => loginWithPopup()}
            >
              <FcGoogle />
              <span>
                Login With Google
              </span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
