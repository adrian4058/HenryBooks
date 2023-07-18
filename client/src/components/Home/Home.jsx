import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TYPES } from "../../actions/index";
import "./Home.css";
import Slider from "../Slider/Slider";
import Chat from "../ChatBot/Chat";
import SliderProducts from "../SliderProducts/SliderProducts";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  // Llámado de libros
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  const history = useHistory();
  //ESTADOS
  const token = useSelector((state) => state.token);
  const userProfile = useSelector((state) => state.userProfile);
  const cart = useSelector((state) => state.cart);
  // allBooks contiene TODOS los libros
  const allBooks = useSelector((state) => state.allBooks);

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    localStorage.setItem("cart", JSON.stringify(cart));
    // addCartAlert(true);
    if (token && userProfile) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Añadido al Carrito",
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
    <div className="home">
      {/* {window.scrollTo(0, 0)} */}
      <div className="home-icons__sm">
        <a
          className="icon-color-fb"
          href="https://www.facebook.com/people/Henry-Book/100089922381588/"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-facebook" />
        </a>
        <a
          className="icon-color-ig"
          href="https://www.instagram.com/henrybooks_pf/"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-instagram" />
        </a>
        <a
          className="icon-color-tw"
          href="https://twitter.com/HenryBooks_PF"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-twitter" />
        </a>
      </div>
      <Navbar />
      <div className="home-content Container">
        <div className="home-welcome__content">
          <div className="home-welcome">
            <h1 className="home-welcome__h1">¡Bienvenido a Librería!</h1>
            <h3 className="home-welcome__h3">
              Aquí puedes encontrar tus libros favoritos
            </h3>
          </div>

          <Slider />
          <div className="home-products-slider">
            <SliderProducts />
          </div>
        </div>

        <Filters allBooks={allBooks} addToCart={addToCart} />

        <Chat />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
