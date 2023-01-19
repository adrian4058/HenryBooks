import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // mover a navBar
import Style from "./LandingPage.module.css";

function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); // mover a navBar

  return (
    <>
      <div className={Style.main_container}>
        <h1 className={Style.title}>HENRY BOOKS</h1>
        <h3>Online Books Store</h3>
        <div className={Style.paragram}>
          <p>
            Welcome to Henry's online store.
            <br /> On this website you can buy or sell the books that you like
            the most.
            <br /> We have a large catalog of books.
            <br /> What are you waiting for?
            <br /> Register and start selling or acquiring the best books.
          </p>
        </div>
        {/* mover navBar*/}
        <div className={Style.btnLogin}>
          {isAuthenticated ? (
            <button onClick={() => logout()}>Logout</button>
          ) : (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        </div>
        {isAuthenticated && (
          <div className={Style.user}>
            <img src={user.picture} alt="" />
            <h4>{user.name}</h4>
          </div>
        )}
        <div>
          <Link to="/home">
            <button className={Style.btnHome}>Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
