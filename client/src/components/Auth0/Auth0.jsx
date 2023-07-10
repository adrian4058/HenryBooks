import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import * as actions from "../../actions/index";
import { useHistory } from "react-router-dom";
import Api from "../../Global";
import Swap from "sweetalert2";

function Auth0() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [userPicture, setUserPicture] = useState("");
  // let [variable, setVariable] = useState("");
  // let token = useSelector((state) => state.token);
  // let [home, setHome] = useState(false);
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0();
  // useEffect(() => {
  //   if (token) {
  //     console.log("estoy aqui");
  //   }
  // });

  useEffect(() => {
    if (user) {
      // setVariable(user);
      const picture = user.picture;
      // setUserPicture(picture);
      let datos = {
        email: user.email,
        password: "Auth0pass",
        nombre: user.nickname,
        img: picture,
      };
      let url = Api.Url + "/auth/signup";
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
          let url = Api.Url + "/auth/signin";
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
                localStorage.setItem(
                  "usuario",
                  JSON.stringify(respuesta.usuario)
                );
                console.log("usuarios", localStorage.getItem("usuario"));
                // setHome(true);
                Swap.fire({
                  icon: "success",
                  title: `User login! Welcome, ${respuesta.usuario.nombre}`,
                  timer: 2000,
                });

                history.push("/home");
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
