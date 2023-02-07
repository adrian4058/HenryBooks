import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SliderProducts from "../SliderProducts/SliderProducts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail } from "../../actions/index";
import "./Details.css";
import axios from "axios";
import Reviews from "../Reviews/Reviews";
import Api from "../../Global";

function Details(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
    window.scrollTo(0, 0)
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

  console.log(details);

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
              {<h4>Author:</h4>}
              {<h4>{details.Autor?.nombre}</h4>}
            </div>
            <div className="book-info__info">
              {details.editorial && <h4>Editorial: </h4>}
              {details.editorial && <p>{details.editorial}</p>}
            </div>
            <div className="book-info__info">
              {details.genero && <h4>Genre: </h4>}
              {details.genero && <p>{details.genero}</p>}
            </div>
            <div className="book-info__info">
              {details.price && (
                <h4 className="book-info__price">${details.price}</h4>
              )}
            </div>
            {
              details.stock !== 0 ?
                <button className="btn-pay" onClick={() => sendMp()}>
                  <span>Pay</span>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button> :
                <h3 className="No-Stock">No Hay Stock</h3>
            }
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

