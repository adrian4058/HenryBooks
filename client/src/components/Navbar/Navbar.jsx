import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import Style from "./NavBar.module.css";

function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className={Style.navBar_container}>
      <Link to="/home">
        <button className={Style.btn_navBar}>Home</button>
      </Link>
      <Link to="/about-us">
        <button className={Style.btn_navBar}>About</button>
      </Link>
      <div className={Style.searchBar}>
        <SearchBar />
      </div>
      <div>
        {isAuthenticated ? (
          <button className={Style.btnLogin} onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <button
            className={Style.btnLogin}
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        )}
      </div>
      {isAuthenticated && (
        <div className={Style.user}>
          <img src={user.picture} alt="" />
          <h4>{user.name}</h4>
        </div>
      )}
    </div>
  );
}

export default NavBar;
