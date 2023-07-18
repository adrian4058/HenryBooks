import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../actions/index";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
import Auth0 from "../Auth0/Auth0";
import Swal from "sweetalert2";
import Api from "../../Global";

const Login = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  let [view, setView] = useState(false);

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
      let url = Api.Url + "/auth/signin";
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
            localStorage.setItem("token", respuesta.token);
            localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
            console.log("usuarios", localStorage.getItem("usuario"));
            Swal.fire({
              icon: "success",
              title: `Welcome to Henry Books, ${respuesta.usuario.nombre}!`,
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/home");
          } else {
            Swal.fire({
              icon: "error",
              title: respuesta.message,
            });
          }
        });
    },
  });

  const handleView = (e) => {
    e.preventDefault();
    view ? setView(false) : setView(true);
  };

  return (
    <form className="Login" noValidate onSubmit={handleSubmit}>
      <div className="Login-content">
        <div className="Login-home-container">
          <Link to="/home">
            <button className="Login-home__btn">
              <AiFillHome />
              <span>Inicio</span>
            </button>
          </Link>
        </div>
        <h1>Acceso</h1>

        <div className="Login-form">
          <div className="Login-input">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              placeholder="E-Mail"
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
            <label htmlFor="password">Contraseña:</label>
            <input
              type={view ? "text" : "password"}
              placeholder="Contraseña"
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
            <div className="eye-password">
              <button onClick={handleView} className="btn-view">
                {!view ? (
                  <ion-icon name="eye-outline" />
                ) : (
                  <ion-icon name="eye-off-outline" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="Login-login__btn">
            <AiOutlineLogin />
            Inicio de sesión
          </button>
        </div>

        <p className="Login-noaccount">
          ¿No tienes ninguna cuenta?
          <Link to="/registerdos">
            <span className="Login-register__link">¡Regístrate aquí!</span>
          </Link>
        </p>
        <p>O</p>
        <Auth0 />
      </div>
    </form>
  );
};

export default Login;
