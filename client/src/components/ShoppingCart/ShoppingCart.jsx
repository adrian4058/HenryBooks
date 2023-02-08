import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TYPES } from "../../actions";
import axios from "axios";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import Api from "../../Global";

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

  return (
    <div>
      <NavBar />
      <h3> Your Books in Cart</h3>
      <article>
        {allBooks.map((book) => (
          <Card
            key={book.id}
            id={book.id}
            genre={book.genero}
            author={book.Autor.nombre}
            image={book.image}
            name={book.name}
            price={book.price}
            addToCart={addToCart}
          />
        ))}
      </article>
      <h3>Carrito</h3>
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
          />
        ))}
      </article>
      <button className="btn-pay" onClick={() => sendMp()}>
        <span>Pay</span>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
