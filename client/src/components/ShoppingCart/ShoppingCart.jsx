import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TYPES } from "../../actions";
import axios from "axios";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import Api from "../../Global";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);

  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };
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

  const sendMp = async () => {
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
    <div>
      <NavBar />
      <h3> Your Books in Cart</h3>
      
      <article className="box">
        <button onClick={clearCart}>Limpiar Carrito</button>
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
      </article>
      <h3>Total a pagar: ${total}</h3>
      <button className="btn-pay" onClick={() => sendMp()}>
        <span>Pay Cart</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      <Footer />
    </div>
  ) : (
    <div>
      <NavBar />
      <h2>You have no products added to the cart</h2>
      <br />
      <br />
      <br />
      <div>
        <Link className="btn-pay" to={"/home"}>
          <h2 className="fa-solid fa-cart-shopping">Add products</h2>
        </Link>
      </div>
      <br />

      <Footer />
    </div>
  );
};

export default ShoppingCart;
