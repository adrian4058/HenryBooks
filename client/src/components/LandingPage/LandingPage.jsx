import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-container">
        <h1 className="landing-title">BOOKS STORE</h1>
        <div className="landing-content">
          <h2>Online Books Store</h2>
          <div className="paragram">
            <p>
              Welcome to online store.
              <br /> On this website you can buy or sell the books that you like
              the most.
              <br /> We have a large catalog of books.
              <br /> What are you waiting for?
              <br /> Register and start selling or acquiring the best books.
            </p>
          </div>
          <div></div>
          <Link to="/home">
            <button className="landing-btn">
              <span className="landing-btn__span">Continuar</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
