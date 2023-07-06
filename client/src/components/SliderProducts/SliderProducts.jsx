import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Style from "./SP.module.css";
import "swiper/css";
import "swiper/css/pagination";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
// import { getAllBooks, TYPES } from "../../actions/index";
import { useEffect, useState } from "react";

function SliderProducts() {
  const allBooks = useSelector((state) => state.allBooks);
  // const token = useSelector((state) => state.token);
  const [, addCartAlert] = useState(false);
  useEffect(() => {
    addCartAlert(true);
  }, []);

  const books = allBooks.filter((e) => e.stock < 60);

  return (
    <>
      <div className={Style.container}>
        <h2>Featured Books</h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          className="mySwiper"
        >
          {books.map((elem) => (
            <SwiperSlide key={elem.id}>
              {" "}
              <Card
                key={elem.id}
                genre={elem.genero}
                author={elem.Autor.nombre}
                image={elem.image}
                name={elem.name}
                id={elem.id}
                price={elem.price}
                inSlider
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default SliderProducts;
