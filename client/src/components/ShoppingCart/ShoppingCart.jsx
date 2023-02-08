import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, GET_ALL_BOOKS, TYPES } from "../../actions";
import Card from "../Card/Card";
import CartItem from "./CartItem";

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

  

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box">
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
    </div>
  );
};

export default ShoppingCart;
