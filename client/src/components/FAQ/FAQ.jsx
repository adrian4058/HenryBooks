import Style from "./FAQ.module.css";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import { useState } from "react";

function FAQ() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);

  return (
    <div className={Style.faq_content}>
      {/* {window.scrollTo(0, 0)} */}
      <NavBar />
      <div className={Style.faq_total}>
        <div className={Style.content}>
          <h2 className={Style.title_2}>¿Cómo comprar?</h2>
          <p>
            Realizar una compra en <strong>Henry Books</strong> es muy simple.
            Sigue estos pasos:
          </p>
        </div>

        <div className={Style.buy}>
          <div className={Style.content2}>
            <span>
              <ion-icon name="storefront-outline" />
            </span>

            <h2 className={Style.title_3}>
              {" "}
              Elegí los productos que vas a comprar
            </h2>

            <p>Si querés más de uno, sumalos a tu carrito.</p>
          </div>

          <div className={Style.separator}></div>

          <div className={Style.content3}>
            <span>
              <ion-icon name="cash-outline" />
            </span>
            <h2 className={Style.title_3}>
              {" "}
              Pagá con el medio de pago que quieras
            </h2>

            <p>
              Comprá con seguridad: usamos la tecnología <br />
              de Mercado Pago.
            </p>
          </div>
        </div>

        <div className={Style.faqs}>
          <h2 className={Style.title}>Preguntas frecuentes</h2>

          <div className={Style.q}>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className={Style.btn}
            >
              <h3 className={Style.q1}>
                ¿Cómo puedo realizar cambios y devoluciones?{" "}
              </h3>
            </button>

            {showAnswer && (
              <p className={Style.res}>
                Para hacer un cambio o devolución, contactanos para que podamos
                ayudarte.
                <br /> <strong>henrybooks.info@gmail.com</strong>
              </p>
            )}
          </div>

          <div className={Style.separatorQ}></div>

          <div className={Style.q}>
            <button
              onClick={() => setShowAnswer2(!showAnswer2)}
              className={Style.btn}
            >
              <h3 className={Style.q1}>¿Puedo pagar en cuotas?</h3>
            </button>

            {showAnswer2 && (
              <p className={Style.res}>
                Añade la cantidad de productos que quieras a tu carrito. <br />{" "}
                Si decidís comprarlo, una vez que le das a pagar podrás ver las promociones.
              </p>
            )}
          </div>

          <div className={Style.separatorQ}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
