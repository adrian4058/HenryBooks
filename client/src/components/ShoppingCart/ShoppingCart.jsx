import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../actions";
import axios from "axios";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import Api from "../../Global";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import Swal from "sweetalert2";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userProfile);
  const cart = useSelector((state) => state.cart);

  const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const payerEmail = usuario.email;
  const sendMp = async (e) => {
    // e.preventDefault();

    const compra = cart.map((item) => {
      return {
        title: item.name,
        description: item.editorial,
        picture_url: item.image,
        category_id: item.genero,
        quantity: item.quantity,
        unit_price: item.price,
      };
    });
    const body = {
      item: compra,
      payer: {
        email: payerEmail,
      },
    };
  
    try {
      let respuesta;

      await axios
        .post(Api.Url + "/payment", body, payerEmail)
        .then((res) => {
          console.log("aqui tambien entro", res);
          respuesta = res.data[0];
          return res.data[0];
        })
        .catch((error) => console.log(error));

      Swal.fire({
        title: "¡Link de compra generado correctamente!",
        icon: "success",
      });
      setTimeout(function() {
        window.location.href = respuesta;
      }, 5000);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

  return cart.length > 0 ? (
    <div className="Shopping-Cart Container">
      {window.scrollTo(0, 0)}
      <NavBar />
      <div className="Shopping-Cart__content ">
        <div className="Shopping-Cart-box">
          <div className="Shopping-Cart-clean">
            <h1 className="Shopping-Cart-title">TUS LIBROS EN EL CARRITO</h1>
            <button className="Cart-btn Cart-clean" onClick={clearCart}>
              Limpiar Carrito
            </button>
          </div>
          {cart.map((item, index) => (
            <CartItem
              key={index}
              genre={item.genero}
              image={item.image}
              name={item.name}
              id={item.id}
              price={item.price}
              quantity={item.quantity}
              delFromCart={delFromCart}
              totalCart={total}
            />
          ))}
        </div>
        <div className="Shopping-Cart__pay">
          <h3>Total a Pagar:  ${total}</h3>
          <button className="btn-pay" onClick={(e) => sendMp(e)}>
            <span>Pagar Carrito</span>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="Shopping-Cart Container">
      <NavBar />
      <div className="No-products">
        <div className="No-products__content">
          <h1>No tienes productos añadidos al carrito</h1>
          <h1>:(</h1>
          <div>
            <Link to={"/home"}>
              <button className="btn-pay no-products__btn">
                <i className="fa-solid fa-cart-shopping"></i>Añade productos
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
