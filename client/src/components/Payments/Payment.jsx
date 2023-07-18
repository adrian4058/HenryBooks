import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Api from "../../Global";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyPDF from "../Payments/myPDF";
import Swal from "sweetalert2";
import "./Payment.css";

import { FaArrowAltCircleDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TYPES } from "../../actions";

import axios from "axios";
import PaymentItem from "./PaymentItem";

const Payment = () => {
  const dispatch = useDispatch();
  const [orderNumber, setOrder] = useState(113);
  const usuario = useSelector((state) => state.userProfile);
  const cart = useSelector((state) => state.cart);
  let total_Price = 0;
  for (let i = 0; i < cart.length; i++) {
    total_Price += cart[i].price * cart[i].quantity;
  }

  const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const payerEmail = usuario.email;
  const history = useHistory();
  const sendMail = async (e) => {
    const itemsCart = cart.map((item) => {
      return {
        title: item.name,
        description: item.editorial,
        picture_url: item.image,
        category_id: item.genero,
        quantity: item.quantity,
        unit_price: item.price,
      };
    });

    try {
      const response = await axios.post(Api.Url + "/email", {
        itemsCart,
        payerEmail,
      });

      setOrder(orderNumber + 1);
      Swal.fire({
        title: "¡Gracias por comprar!",
        icon: "success",
      });
      dispatch({ type: TYPES.CLEAR_CART });
      setTimeout(() => {
        history.push("/home");
      }, 5000);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Payment-content Container">
      <NavBar />
      <div className="Shopping-Cart__content ">
        <div className="Shopping-Cart-box">
          <div className="Shopping-Cart-clean">
            <h1 className="Shopping-Cart-title">FINALIZA TU COMPRA</h1>
          </div>
          <div className="Cart__info">
            <h2>Producto</h2>
            <h2>Cantidad</h2>
            <h2>Precio</h2>
          </div>
          {cart.map((item, index) => (
            <PaymentItem
              key={index}
              genre={item.genero}
              image={item.image}
              name={item.name}
              id={item.id}
              price={item.price}
              quantity={item.quantity}
              delFromCart={delFromCart}
            />
          ))}
          <div className="Shopping-Cart__pay">
            <div className="Payment-Cart__pay-items_total">
              <span className="Payment__detail">
                <h3>Total Pagado</h3>
                <p>${total_Price}.00</p>
              </span>
              <span>
                <p>
                  Comprobante de pago
                </p>
              </span>
              <PDFDownloadLink
              className="PDF_Generator"
                document={
                  <MyPDF
                    orderNumber={orderNumber}
                    cart={cart}
                    total_Price={total_Price}
                  />
                }
                fileName="comprobantecompra.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Generando PDF..."
                  ) : (
                    <div>
                      <button
                        className="btn-pay__cart"
                        onClick={(e) => sendMail(e)}
                      >
                        Finalizar Compra <FaArrowAltCircleDown />
                      </button>
                    </div>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
