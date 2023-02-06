import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
//import LoginGoogle from "../GoogleLogin/GoogleLogin";
import "./Login.css";
//import { useAuth0 } from "@auth0/auth0-react";
//import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import Api from "../../Global";
import * as actions from "../../actions/index";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
//import { FcGoogle } from "react-icons/fc";
import HB_logo from "../img/HenryBooks_Logo.png";
import Auth0 from "../Auth0/Auth0";

const Login = () => {
  let dispatch = useDispatch();
  let token = useSelector((state) => state.token);
  //const cookie = new Cookies();
  let [home, setHome] = useState(false);
  //const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (token) {
      console.log("estoy aqui")
      setHome(true)
      // return <Redirect to="/home" />;
    }
  })
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
      const datos = {
        email: values.email,
        password: values.password,
      };
      let url = "http://localhost:5685/auth/signin";
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
            dispatch(actions.llenarUsuario(respuesta.usuario));
            dispatch(actions.putToken(respuesta.token));
            setHome(true);
            alert(`bienvenido ${respuesta.usuario.nombre}`);
          } else {
            alert(respuesta.message);
          }
        });
      // console.log(values);
      // console.log(data);
      // const response = await fetch(Api.Url + "/auth/signin", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // const parseRes = await response.json();
      // localStorage.setItem("token", parseRes.token);
      // console.log("trae respuesta", parseRes);
      // dispatch(actions.putToken(parseRes.token));
      // cookie.set("email", data.email, { path: "/" });
      // alert(`welcome ${data.email.split("@")[0]}`);
      // // window.location.href = "./home";
    },
  });
  if (home === true) {
    return <Redirect to="/home" />;
  }

  return (
    <form className="Login" noValidate onSubmit={handleSubmit}>
      <div className="Login-content">
        <div className="Login-home-container">
          <Link to="/home">
            <button className="Login-home__btn">
              <AiFillHome />
              <span>Home</span>
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
              className={`Login-Register__input ${touched.email &&
                errors.email &&
                "error_input"}`}
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

          {/* <Link to="/home"> */}
          <button type="submit" className="Login-login__btn">
            <AiOutlineLogin />
            Log In
          </button>
          {/* </Link> */}
        </div>

        <p className="Login-noaccount">
          Don't have any account?
          <Link to="/registerdos">
            <span className="Login-register__link">Register here!</span>
          </Link>
        </p>
        <p>Or</p>
        <Auth0 />
        {/* <LoginGoogle /> */}

        {/* <div className="Login-google">
          {isAuthenticated ? (
            <button
              className="Login-google__btn"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <FcGoogle />
              <span>Logout</span>
            </button>
          ) : (
            <button
              className="Login-google__btn"
              onClick={() => loginWithPopup()}
            >
              <FcGoogle />
              <span>Login With Google</span>
            </button>
          )}
        </div> */}
      </div>
    </form>
  );
};

export default Login;
