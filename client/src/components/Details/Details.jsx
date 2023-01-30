import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import books from "../../utils/books.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail } from "../../actions/index";
import "./Details.css";
import axios from "axios";
import Reviews from "../Reviews/Reviews";

function Details(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
  }, [dispatch, id]);

  console.log(details);

  const sendMp = async () => {
    const compra = [
      {
        title: details.name,
        description: details.editorial,
        picture_url: details.image,
        category_id: details.genero,
        quantity: 1,
        unit_price: details.price,
      },
    ];

    // const compra = arreglo;
    const body = {
      item: compra,
    };

    console.log(body);

    try {
      const respuesta = await axios
        .post("http://localhost:7415/payment", body)
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
              {details.name && <h4>{details.name}</h4>}
            </div>
            <div className="book-info__info">
              {<h4>Author:</h4>}
              {<h4>{details.Autor?.nombre}</h4>}
            </div>
            <div className="book-info__info">
              {details.editorial && <h4>Editorial: </h4>}
              {details.editorial && <p>{details.editorial}</p>}
            </div>
            <div className="book-info__info">
              {details.genero && <h4>Genre: {details.genero}</h4>}
            </div>
            <div className="book-info__info">
              {details.price && (
                <h4 className="book-info__price">${details.price}</h4>
              )}
            </div>
            <div className="book-btn__buy">
              <button className="book-btn__buy"onClick={() => sendMp()}>
                Pay <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        ) : (
          //cambio
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        )}
      </div>
      <Reviews LibroId={id} />
      <Footer />
    </div>
  );
}

export default Details;
