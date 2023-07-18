import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SliderProducts from "../SliderProducts/SliderProducts";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail, TYPES } from "../../actions/index";
import "./Details.css";
import Reviews from "../Reviews/Reviews";
import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import tarjetas from "../img/tarjetas.png";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const token = useSelector((state) => state.token);
  const cart = useSelector((state) => state.cart);

  const history = useHistory();

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const addID = details.id;

  const addToCart = (addID) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: addID });
    localStorage.setItem("cart", JSON.stringify(cart));
    if (token) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Producto Añadido al Carrito",
        showConfirmButton: false,
        timer: 900,
      });
    } else {
      Swal.fire("Inicia sesión o regístrate para comprar", {
        icon: "warning",
        timer: 900,
      });
      history.push("/login");
    }
  };

  return (
    <div key={id} className="Details Container">
      <Navbar />
      <div className="book-container">
        {details.image ? (
          <div>
            <p className="foot-book">
              <Link className="foot-book_home" to="/home">
                Inicio
              </Link>{" "}
              / <>{details.name}</>
            </p>
            <img className="book-img" src={details.image} alt="imagen-libro" />
          </div>
        ) : (
          <svg className="loading-svg" viewBox="25 25 50 50">
            <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
          </svg>
        )}
        {details ? (
          <div className="book-info__total">
            <div className="book-info_title">
              <div className="book-info__info">
                {details.name && <h2>{details.name}</h2>}
              </div>
              <div className="book-info__info">
                {details.price && (
                  <h3 className="book-info__price">${details.price}</h3>
                )}
              </div>
              <img
                className="book-info__info-img"
                src={tarjetas}
                alt="pay_methods"
              />
            </div>
            <div className="book-info">
              <div className="book-info__info">
                <h4>Autor:</h4>
                {<p>{details.Autor?.nombre}</p>}
              </div>
              <div className="book-info__info">
                <h4>Editorial: </h4>
                {details.editorial && <p>{details.editorial}</p>}
              </div>
              <div className="book-info__info">
                <h4>Género: </h4>
                {details.genero && <p>{details.genero}</p>}
              </div>
              <div className="book-info__info">
                <h4>Stock: </h4>
                {details.stock && <p>{details.stock}</p>}
              </div>
              {details.stock !== 0 ? (
                <button className="btn-pay" onClick={() => addToCart(addID)}>
                  <span>Añadir al Carrito</span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              ) : (
                <h3 className="No-Stock">No Hay Stock</h3>
              )}
            </div>
          </div>
        ) : (
          //cambio
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        )}
      </div>
      <Reviews LibroId={details.id} commentsReview={details.Resenas} />
      <SliderProducts />
      <Footer />
    </div>
  );
}

export default Details;
