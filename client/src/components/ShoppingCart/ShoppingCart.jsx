import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TYPES } from "../../actions";
import axios from "axios";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import Api from "../../Global";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const usuario = useSelector((state) => state.userProfile);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

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
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const sendMp = async (e) => {
    e.preventDefault();
    localStorage.setItem("usuario", JSON.stringify(usuario));
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
    };
    try {
      const respuesta = await axios
        .post(Api.Url + "/payment", body)
        .then((res) => {
          return res.data[0];
        })

        .catch((error) => console.log(error));
      window.location.href = respuesta;
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

  return cart.length > 0 ? (
    <div className="Shopping-Cart">
      <NavBar />
      <div className="Shopping-Cart__content">
        <div className="Shopping-Cart-box">
          <h1>Your Books in Cart</h1>
          <button className="Cart-btn Cart-clean" onClick={clearCart}>
            Limpiar Carrito
          </button>
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
          <h3>Total a pagar: ${total}</h3>
          <button className="btn-pay" onClick={(e) => sendMp(e)}>
            <span>Pay Cart</span>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="Shopping-Cart">
      <NavBar />
      <div className="No-products">
        <h1>You have no products added to the cart</h1>
        <h1>:(</h1>
        <div>
          <Link to={"/home"}>
            <button className="btn-pay no-products__btn">
              <i className="fa-solid fa-cart-shopping"></i>Add products
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
