import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import books from "../img/wallpaper.jpg";
import pay_methods from "../img/payment methods.png";
import price from "../img/price.png";
import best_author from "../img/best-author.png";
import ana_frank from "../img/ana_frank.png";

function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-text">
        <div className="landing-content">
          <h1 className="landing-title">
            Tienda online
            <br />
            de Libros Digitales
          </h1>
          <div className="paragram">
            <h2>Bienvenidos a nuestra tienda en línea.</h2>
            <p>
              Tenemos un amplio catálogo de libros..
              <br />
              ¿Qué estás esperando?
              <br />
              Regístrate y comienza a adquirir los mejores libros.
            </p>
          </div>
          <Link to="/home">
            <button className="landing-btn">
              <span className="landing-btn__span">Explora los libros</span>
              <i className="fa-solid fa-arrow-right" />
            </button>
          </Link>
        </div>
        <div className="landing-img">
          <img className="book-img__landing" src={books} alt="books" />
        </div>
      </div>
      <div className="landing-foot">
        <div className="landing-sentence">
          <img className="img__benefit" src={ana_frank} alt="anafrank_img" />
          <div className="landing-sentence__text">
            <h3>Ana Frank.</h3>
            <p>
              "Cuando escribo puedo deshacerme <br /> de todos mis problemas "
            </p>
          </div>
        </div>
        <div className="landing-benefit">
          <div className="landing-benefit__item">
            <img className="img__benefit" src={pay_methods} alt="payments" />
            <div className="landing-benefit__description">
              <h4>Multiples medios de pago</h4>
              <p>Elegí el método que más se adapte a vos</p>
            </div>
          </div>
          <div className="landing-benefit__item">
            <img className="img__benefit" src={price} alt="best price" />
            <div className="landing-benefit__description">
              <h4>Manejamos los mejores precios</h4>
              <p>Miércoles 20% OFF</p>
            </div>
          </div>
          <div className="landing-benefit__item">
            <img className="img__benefit" src={best_author} alt="best author" />
            <div className="landing-benefit__description">
              <h4>Autores Destacados</h4>
              <p>Los mejores autores del momento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
