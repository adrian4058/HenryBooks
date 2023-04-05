import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Contact</h4>
            <p>+54 911 4946-8036 </p>
            <p>henrybooks.info@gmail.com</p>
          </div>

          <div className="footer-column">
            <h4>Follow</h4>
            <a
              href="https://www.facebook.com/people/Henry-Book/100089922381588/"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="logo-facebook" /> Facebook
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
            <h4>Navigation</h4>
            <Link to="/home">
              <p className="navegationText">Home</p>
            </Link>
            <Link to="/team">
              <p className="navegationText">Team</p>
            </Link>
            <Link to="/about-us">
              <p className="navegationText">About us</p>
            </Link>
            <Link to="/preguntas">
              <p className="navegationText">FaQs</p>
            </Link>
          </div>
        </div>

        <p className="footer-copy">Ⓒ Henry Books | All Rights Reserved 2023 </p>
      </div>
    </div>
  );
}

export default Footer;
