import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail } from "../../actions/index";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Details(props) {
  const { id } = useParams();
  const details = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetail(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);

  return (
    <div>
      <NavBar/>
      {details.name ? <h1>{details.name}</h1> : <h1>Loading</h1>}
      {details.image && <img src={details.image} alt="imagen-libro" />}
      {details.autor && <h4>Author:</h4> }
      {details.autor && <h4>{details.autor}</h4>}
      {details.editorial && <h4>Editorial: </h4>}
      {details.editorial && <p>{details.editorial}</p>}
      {details.genero && <h4>Genre: {details.genero}</h4>}
      {details.price && <h4>Price: {details.price}</h4>}
      <Footer/>
    </div>
  );
}

export default Details;
