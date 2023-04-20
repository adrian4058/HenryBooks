import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SliderProducts from "../SliderProducts/SliderProducts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail, TYPES } from "../../actions/index";
import "./Details.css";
import Reviews from "../Reviews/Reviews";
import Swal from "sweetalert2";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const token = useSelector((state) => state.token);
  const [, addCartAlert] = useState(false);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const addID = details.id;

  useEffect(() => {
    addCartAlert(true);
  }, []);

  const addToCart = (addID) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: addID });
    addCartAlert(true);
    if (token) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Product Added To Cart",
        showConfirmButton: false,
        timer: 900,
      });
      console.log("agregado");
    } else {
    }
  };

  return (
    <div key={id} className="Details">
      <Navbar />
      <div className="book-container">
        {details.image ? (
          <img className="book-img" src={details.image} alt="imagen-libro" />
        ) : (
          <svg className="loading-svg" viewBox="25 25 50 50">
            <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
          </svg>
        )}
        {details ? (
          <div className="book-info">
            <div className="book-info__info">
              {details.name && <h2>{details.name}</h2>}
            </div>
            <div className="book-info__info">
              <h4>Author:</h4>
              {<p>{details.Autor?.nombre}</p>}
            </div>
            <div className="book-info__info">
              <h4>Editorial: </h4>
              {details.editorial && <p>{details.editorial}</p>}
            </div>
            <div className="book-info__info">
              <h4>Genre: </h4>
              {details.genero && <p>{details.genero}</p>}
            </div>
            <div className="book-info__info">
              <h4>Stock: </h4>
              {details.stock && <p>{details.stock}</p>}
            </div>
            <div className="book-info__info">
              {details.price && (
                <h3 className="book-info__price">${details.price}</h3>
              )}
            </div>
            {details.stock !== 0 ? (
              <button className="btn-pay" onClick={() => addToCart(addID)}>
                <span>Add To Cart</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            ) : (
              <h3 className="No-Stock">No Hay Stock</h3>
            )}
          </div>
        ) : (
          //cambio
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        )}
      </div>
      <Reviews LibroId={id} commentsReview={details.Resenas} />
      <SliderProducts />
      <Footer />
    </div>
  );
}

export default Details;
