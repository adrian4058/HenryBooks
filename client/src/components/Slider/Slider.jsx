import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import image1 from "./img/image1.png";
import image2 from "./img/image2.jpg";
import image3 from "./img/image3.png";
import Style from "./slider.module.css";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper";

function App() {
  return (
    <>
      <div className={Style.container}>
        <Swiper
          navigation={false}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {/* <SwiperSlide>
            <img src={image1} alt="#" className={Style.img} />
          </SwiperSlide> */}
          <SwiperSlide>
            <img src={image2} alt="#" className={Style.img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="#" className={Style.img} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default App;
