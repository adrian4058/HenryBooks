import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TYPES } from "../../actions";
import Card from "../Card/Card";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  // const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);

  const addToCart = (id) => {
    
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };
  const delFromCart = () => {};
  const clearCart = () => {};

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
            author={item.Autor.nombre}
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
