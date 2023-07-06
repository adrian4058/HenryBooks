import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useDispatch} from "react-redux";
import * as actions from "../../actions/index";
import { AiOutlineLogin, AiFillHome } from "react-icons/ai";
// import HB_logo from "../img/HenryBooks_Logo.png";
import Auth0 from "../Auth0/Auth0";
import Swal from "sweetalert2";
import Api from "../../Global";

const Login = () => {
  let dispatch = useDispatch();
 
  let [home, setHome] = useState(false);
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
            setHome(true);
            Swal.fire({
              icon: "success",
              title: `Welcome to Henry Books, ${respuesta.usuario.nombre}!`,
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: respuesta.message,
            });
          }
        });
    },
  });

  if (home === true) {
    return <Redirect to="/home" />;
  }

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
              type={view ? "text" : "password"}
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
            Log In
          </button>
        </div>

        <p className="Login-noaccount">
          Don't have any account?
          <Link to="/registerdos">
            <span className="Login-register__link">Register here!</span>
          </Link>
        </p>
        <p>Or</p>
        <Auth0 />
      </div>
    </form>
  );
};

export default Login;
