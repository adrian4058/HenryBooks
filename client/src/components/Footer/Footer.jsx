import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Contacto</h4>
            <p>+54 911 4946-8036 </p>
            <p>henrybooks.info@gmail.com</p>
          </div>

          <div className="footer-column">
            <h4>Seguir</h4>
            <a
              href="https://www.facebook.com/people/Henry-Book/100089922381588/"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon className="icon-color-fb" name="logo-facebook" />{" "}
              Facebook
            </a>
            <a
              href="https://www.instagram.com/henrybooks_pf/"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="logo-instagram" /> Instagram
            </a>
            <a
              href="https://twitter.com/HenryBooks_PF"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="logo-twitter" /> Twitter
            </a>
          </div>

          <div className="footer-column">
            <h4>Navegación</h4>
            <Link to="/home">
              <p className="navegationText">Inicio</p>
            </Link>
            <Link to="/team">
              <p className="navegationText">Equipo</p>
            </Link>
            <Link to="/about-us">
              <p className="navegationText">Sobre Nosotros</p>
            </Link>
            <Link to="/preguntas">
              <p className="navegationText">Preguntas Frecuentes</p>
            </Link>
          </div>
        </div>

        <p className="footer-copy">
          Ⓒ Tienda de libros | Todos los derechos reservados 2023
        </p>
      </div>
    </div>
  );
}

export default Footer;
