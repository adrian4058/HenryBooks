import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./About.css";

function About() {
  return (
    <div className="about Container">
    {window.scrollTo(0, 0)}
      <Navbar />
      <div className="content-container">
        <div className="content">
          <h1 className="content-h1">ABOUT US</h1>
          <h2 className="content-h2">Chapter 01</h2>
          <h3 className="content-h3">By: Team 03</h3>
          <p className="content-p">
            <span className="content-span">S</span>omos Henry Books. Una
            librería independiente con una gran variedad de títulos en nuestras
            estanterías. Ofrecemos una selección cuidadosamente curada de libros
            de todos los géneros, desde bestsellers hasta tesoros escondidos.
          </p>{" "}
          <br />
          <p className="content-p">
            Nuestros clientes aprecian nuestro ambiente acogedor y nuestra
            atención personalizada. Ofrecemos un servicio de reserva de libros y
            también organizamos eventos regulares, como charlas de autores y
            sesiones de lectura para niños.
          </p>
          <br />
          <p className="content-p">
            Además de libros de papel, también ofrecemos una selección de libros
            electrónicos para aquellos que prefieren leer en dispositivos
            digitales.
          </p>
          <p className="content-p">
            Nuestra librería es el lugar perfecto para encontrar tu próxima
            lectura, ya sea para relajarte en casa o para inspirarte en tu
            camino hacia el éxito. Te esperamos en Henry Books, donde siempre
            encontrarás una historia para enamorarte...
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
