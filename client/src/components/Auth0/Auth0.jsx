import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch /*useSelector*/ } from "react-redux";
import { asyncRegisterAuth0 } from "../../actions/index";
import { FcGoogle } from "react-icons/fc";
import * as actions from "../../actions/index";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function Auth0() {
  const dispatch = useDispatch();
  let [variable, setVariable] = useState("");
  let [home, setHome] = useState(false);
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0();
  //console.log(user);
  useEffect(() => {
    if (user) {
      setVariable(user);
      let datos = {
        email: user.email,
        password: "Auth0pass",
        nombre: user.nickname,
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
          datos = {
            email: user.email,
            password: "Auth0pass",
          };
          let url = "http://localhost:5685/auth/signin";
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
        })
        .catch((error) => console.error(error));
    }
  }, [user]);
  function login() {
    loginWithPopup();
  }
  if (home == true) {
    return <Redirect to="/Login" />;
  }
  return (
    <div className="Login-google">
      {isAuthenticated ? (
        <button className="Login-google__btn" onClick={() => logout()}>
          <FcGoogle />
          <span>Logout</span>
        </button>
      ) : (
        <button className="Login-google__btn" onClick={login}>
          <FcGoogle />
          <span>Continue With Google</span>
        </button>
      )}
    </div>
  );
}

export default Auth0;
