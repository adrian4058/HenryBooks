import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
  // const cookies = new Cookies();
  useEffect(() => {
    setToken(token2);
    setUsuario(usuario2);
  }, [usuario2, token2]);

  console.log(usuario.rol);

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
        <Link to="/home">
          <img className="hb" src={hb} alt="HenryBooks" />
        </Link>
        <Link to="/home" className="content-btn__option">
          <button className="navbar-btn__option">Inicio</button>
        </Link>
        <Link to="/about-us" className="content-btn__option">
          <button className="navbar-btn__option">Nosotros</button>
        </Link>
        <Link to="/team" className="content-btn__option">
          <button className="navbar-btn__option">Equipo</button>
        </Link>
      </div>

      <div className="login">
        {Object.keys(usuario).length > 0 ? (
          <div className="login__content">
            {usuario.rol === "admin" ? (
              <div className="navbar-options__link">
                <Link to="/dashboard" className="content-btn__option">
                  <button className="navbar-btn__option">
                    <b>Dashboard</b>
                  </button>
                </Link>
              </div>
            ) : null}
            <Link to="/cart">
              <button className="navbar-btn__option cart-btn">
                <HiShoppingCart />
                Carrito
                <b>
                  ({cart.length})
                  <b className="cart_price">
                    {"  "}$
                    {cart.reduce((acc, el) => acc + el.price * el.quantity, 0)}
                  </b>
                </b>
              </button>
            </Link>
          </div>
        ) : (
          <div className="login__content">
            <Link to="/registerdos" className="content-btn__option">
              <button className="navbar-btn__option">Registro</button>
            </Link>

            <Link to="/login" className="content-btn__option">
              <button className="navbar-btn__option">Acceso</button>
            </Link>
          </div>
        )}
        {Object.keys(usuario).length > 0 ? (
          <>
            <div className="user">
              <div className="avatar">
                <img className="user-img" src={usuario2.img} alt="img" />
                <Link to="/profile">
                  <h4 className="user-name">{usuario.nombre}</h4>
                </Link>
              </div>
              <button
                className="navbar-btn__logout"
                onClick={(e) => cerrrarSesion(e)}
              >
                <ion-icon name="log-out-outline" />
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
