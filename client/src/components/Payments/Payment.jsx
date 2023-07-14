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

const Payment = () => {
  const dispatch = useDispatch();
  const [orderNumber, setOrder] = useState(113);
  const usuario = useSelector((state) => state.userProfile);
  const cart = useSelector((state) => state.cart);

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
      }, 10000);
      
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(total_Price);
  

  return (
    <div className="Payment-content Container">
      <NavBar />
      <div className="Products__Pdf">
        <h1>Generador de PDF</h1>
        <PDFDownloadLink
          document={
            <MyPDF
              orderNumber={orderNumber}
              cart={cart}
              // total_Price={total_Price}
            />
          }
          fileName="documento.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Generando PDF..."
            ) : (
              <div>
                <h5>Pedido detallado: </h5>
                <button onClick={(e) => sendMail(e)}>
                  Descargar Pdf <FaArrowAltCircleDown />
                </button>
              </div>
            )
          }
        </PDFDownloadLink>
      </div>
      <Footer />
    </div>
  );
};




export default Payment;
