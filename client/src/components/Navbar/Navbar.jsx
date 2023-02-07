import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/index";
import { HiShoppingCart } from "react-icons/hi";


function NavBar() {
  let dispatch = useDispatch();
  let token2 = useSelector((state) => state.token);
  let usuario2 = useSelector((state) => state.userProfile);
  let [token, setToken] = useState(token2)
  let [usuario, setUsuario] = useState(usuario2);
  const { logout } = useAuth0();
  const cookies = new Cookies();
  useEffect(() => {
    setToken(token2)
    setUsuario(usuario2)
  }, [usuario2][token2])

  function cerrrarSesion(e) {
    e.preventDefault();
    dispatch(actions.vaciarUsuario());
    dispatch(actions.deletToken());
    logout();
  }
  return (
    <div className="navbar">
      <div className="navbar-logo-options">
        <div className="navbar-logo">
          <Link to="/home">
            <h1 className="navbar-logo__title">HENRYBOOKS</h1>
          </Link>
        </div>
        <div className="navbar-options">
          <div className="navbar-options__link">
            <Link to="/home">
              <button className="navbar-btn__option">
                <b>Home</b>
              </button>
            </Link>
          </div>
          <div className="navbar-options__link">
            <Link to="/about-us">
              <button className="navbar-btn__option">
                <b>About</b>
              </button>
            </Link>
          </div>
          <div className="navbar-options__link">
            <Link to="/team">
              <button className="navbar-btn__option">
                <b>Team</b>
              </button>
            </Link>
          </div>
          {/* <div className="navbar-options__link">
            <Link to="/register">
              <button className="navbar-btn__option">
                <b>Register</b>
              </button>
            </Link>
          </div> */}
          {/* <div className="navbar-options__link">
            <Link to="/login">
              <button className="navbar-btn__option">
                <b>Login</b>
              </button>
            </Link>
          </div> */}
        </div>
      </div>
      <div>
        {usuario.rol == "admin" ? (
          <div className="navbar-options__link">
            <Link to="/dashboard">
              <button className="navbar-btn__option">
                <b>Dashboard</b>
              </button>
            </Link>
          </div>
        ) : null}
        {/* {isAuthenticated || cookies.get("email") ? (
          <div className="navbar-options__link">
            <Link to="/dashboard">
              <button className="navbar-btn__option">
                <b>Dashboard</b>
              </button>
            </Link>
          </div>
        ) : null} */}
      </div>

      <div className="login">
        <div>
          {Object.keys(usuario).length > 0 ? (
            <div>
              <div className="user-btns">
                <Link to="/cart">
                  <button className="navbar-btn__option cart-btn">
                    <b>Cart</b>
                    <HiShoppingCart />
                  </button>
                </Link>
                <button
                  className="navbar-btn__option"
                  onClick={(e) => cerrrarSesion(e)}
                >
                  Logout
                </button>
              </div>
              {cookies.get("email") ? (
                <a href="/profile/edit">
                  {/* <label className="user-name">
                    {"User: " + cookies.get("email")}
                  </label> */}
                </a>
              ) : null}
            </div>
          ) : (
            <div className="login">
              <div className="navbar-options__link">
                <Link to="/registerdos">
                  <button className="navbar-btn__option">
                    <b>Register</b>
                  </button>
                </Link>
              </div>
              <div className="navbar-options__link">
                <Link to="/login">
                  <button className="navbar-btn__option">
                    <b>Login</b>
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* {isAuthenticated || cookies.get("email") ? (
            <div>
              <button
                className="navbar-btn__option"
                onClick={() => {
                  if (isAuthenticated) {
                    dispatch(actions.deletToken);
                    logout({ returnTo: window.location.origin });
                  } else {
                    cookies.remove("email", { path: "/" });
                    window.location.href = "./home";
                  }
                }}
              >
                Logout
              </button>
              {cookies.get("email") ? (
                <a href="/profile/edit">
                  <label className="user-name">
                    {"User: " + cookies.get("email")}
                  </label>
                </a>
              ) : null}
            </div>
          ) : (
            <div className="login">
              <div className="navbar-options__link">
                <Link to="/register">
                  <button className="navbar-btn__option">
                    <b>Register</b>
                  </button>
                </Link>
              </div>
              <div className="navbar-options__link">
                <Link to="/login">
                  <button className="navbar-btn__option">
                    <b>Login</b>
                  </button>
                </Link>
              </div>
            </div>
          )} */}
        </div>
        {/* {isAuthenticated && (
          <div className="user">
            <img className="user-img" src={user.picture} alt="Imagen-user" />
            <h4 className="user-name">{user.nickname}</h4>
          </div>
        )} */}
        {Object.keys(usuario).length > 0 ? (
          <>
            <div className="user">
              <img className="user-img" src={usuario.img} alt="img" />
              <Link to="/profile">
                <h4 className="user-name">{usuario.nombre}</h4>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;

// {error.name?('danger Register-input'):("Register-input")}