import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import imageDefault from "../img/user.png";
import hb from "../img/HenryBooks_Logo.png";
import "./Navbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/index";
import { HiShoppingCart } from "react-icons/hi";

function NavBar() {
  let dispatch = useDispatch();
  let token2 = useSelector((state) => state.token);
  let usuario2 = useSelector((state) => state.userProfile);
  let cart = useSelector((state) => state.cart);
  let [, setToken] = useState(token2);
  let [usuario, setUsuario] = useState(usuario2);
  const { logout } = useAuth0();
  const cookies = new Cookies();
  useEffect(() => {
    setToken(token2);
    setUsuario(usuario2);
  }, [usuario2, token2]);

  function cerrrarSesion(e) {
    e.preventDefault();
    dispatch(actions.vaciarUsuario());
    dispatch(actions.deletToken());
    localStorage.clear();
    logout();
  }
  return (
    <div className="navbar">
   
      <div className="about-hb">
      <div className="back_navbar"></div>
        <Link to="/home">
          <img className="hb" src={hb} alt="HenryBooks" />
        </Link>
        <div className="navbar-options__link">
          <Link to="/home" className="content__item"> 
            <button className="button button--hyperion">
              <span>
                <span>Home</span>
              </span>
            </button>
          </Link>
        </div>
        <div className="navbar-options__link">
          <Link to="/about-us">
            <button className="navbar-btn__option">About</button>
          </Link>
        </div>
        <div className="navbar-options__link">
          <Link to="/team">
            <button className="navbar-btn__option">Team</button>
          </Link>
        </div>
      </div>

      <div className="login">
        {Object.keys(usuario).length > 0 ? (
          <Link to="/cart">
            <button className="navbar-btn__option cart-btn">
              <b>{cart.length}</b>
              <HiShoppingCart />
            </button>
            {cookies.get("email") ? (
              <a href="/profile/edit">
                {/* <label className="user-name">
                    {"User: " + cookies.get("email")}
                  </label> */}
              </a>
            ) : null}
          </Link>
        ) : (
          <div className="login">
            {usuario.rol === "admin" ? (
              <div className="navbar-options__link">
                <Link to="/dashboard">
                  <button className="navbar-btn__option">
                    <b>Dashboard</b>
                  </button>
                </Link>
              </div>
            ) : null}
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
        {Object.keys(usuario).length > 0 ? (
          <>
            <div className="user">
              <div className="avatar">
                <img
                  className="user-img"
                  src={usuario.img ? imageDefault : usuario.img}
                  alt="img"
                />
                <Link to="/profile">
                  <h4 className="user-name">{usuario.nombre}</h4>
                </Link>
              </div>
              <button
                className="navbar-btn__option"
                onClick={(e) => cerrrarSesion(e)}
              >
                Logout
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;

// {error.name?('danger Register-input'):("Register-input")}
