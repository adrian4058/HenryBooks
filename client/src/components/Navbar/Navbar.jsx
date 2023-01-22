import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";

function NavBar() {
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0();

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
        </div>
      </div>

      <div className="login">
        <div>
          {isAuthenticated ? (
            <button className="navbar-btn__option" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          ) : (
            <button
              className="navbar-btn__option"
              onClick={() => loginWithPopup()}
            >
              Login
            </button>
          )}
        </div>
        {isAuthenticated && (
          <div className="user">
            <img className="user-img" src={user.picture} alt="Imagen-user" />
            <h4 className="user-name">{user.nickname}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
