import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Style from './SP.module.css'
import "swiper/css";
import "swiper/css/pagination";
import Card from '../Card/Card'
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from '../../actions/index'
import { useEffect } from "react";

function SliderProducts() {
    const allBooks = useSelector(state => state.books)

    const books = allBooks.filter(e => e.stock < 60)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch])

    return (
        <>
            <div className={Style.container}>

                <h3>Productos Destacados</h3>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    {
                        books.map(elem =>
                            <SwiperSlide>  <Card
                                key={elem.id}
                                genre={elem.genero}
                                author={elem.Autor.nombre}
                                image={elem.image}
                                name={elem.name}
                                id={elem.id}
                                price={elem.price}
                                inSlider />

                            </SwiperSlide>)
                    }


                </Swiper>
            </div>
        </>
    )
}

export default SliderProducts