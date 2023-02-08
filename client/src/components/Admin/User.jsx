import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../actions";
import imagedefault from "../img/img-df.jpeg"
import "./Usuario.css";

export default function User(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    id: props.id,
    rol: props.rol,
    estado: props.estado,
    nombre: props.nombre,
    email: props.email,
    password: props.password,
    direccion: props.direccion,
    pais: props.pais,
    img: props.img,
    ciudad: props.ciudad,
  });
  //console.log(user);
  const handleChangeStatus = (e) => {
    const users = {
      ...user,
      estado: user.estado === "activo" ? "desactivado" : "activo",
    };
    setUser(user);
    dispatch(userUpdate(props.id, users));
    e.preventDefault();
  };

  const handleChange = (e) => {
    const usuario2 = {
      ...user,
      rol: user.rol === "user" ? "admin" : "user",
    };
    setUser(user);
    dispatch(userUpdate(props.id, usuario2));
    e.preventDefault();
  };

  return (
    <div className="User">
      <div className="User-container" key={props.id}>
        <div className="User-img__container">
          <img src={props.img ? props.img : imagedefault} alt="" className="User-img" width={100} />
        </div>

        <h4 className="datos">
          <span>Name:</span>
          <span>{props.nombre}</span>
        </h4>

        <h4 className="datos">
          <span>Country:</span>
          <span>{props.pais}</span>
        </h4>

        <h4 className="datos">
          <span>City/State:</span>
          <span>{props.ciudad}</span>
        </h4>

        <h4 className="datos">
          <span>Address:</span>
          <span>{props.direccion}</span>
        </h4 >

        <h4 className="datos">
          <span>Email:</span>
          <span>{props.email}</span>
        </h4 >

        <h4 className="datos">
          <span>Password:</span>
          <span>{props.password.replace(/[^\s]/g, "*")}</span>
        </h4 >

        <h4 className="datos">
          <span>Role:</span>
          <span>{props.rol}</span>
        </h4 >

        <h4 className="datos">
          <span>State:</span>
          <span>{props.estado}</span>
        </h4 >
      </div >
      <div className="User-btns">
        <button className="btn-users" onClick={handleChangeStatus}>
          {user.estado === "activo" ? "Disable state" : "Activate state"}
        </button>
        <button className="btn-users" onClick={handleChange}>
          {user.rol === "user" ? "Convert to admin" : "convert to user"}
        </button>
      </div>
    </div >
  );
}
