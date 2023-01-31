import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";

function NavBar() {
  const { logout, isAuthenticated, user } = useAuth0();
  const cookies = new Cookies();

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
        {isAuthenticated || cookies.get("email") ? (
          <div className="navbar-options__link">
            <Link to="/dashboard">
              <button className="navbar-btn__option">
                <b>Dashboard</b>
              </button>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="login">
        <div>
          {isAuthenticated || cookies.get("email") ? (
            <div>
              <button
                className="navbar-btn__option"
                onClick={() => {
                  if (isAuthenticated)
                    logout({ returnTo: window.location.origin });
                  else {
                    cookies.remove("email", { path: "/" });
                    window.location.href = "./home";
                  }
                }}
              >
                Logout
              </button>
              {cookies.get("email") ? (
                <a  href="/profile/edit">
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
