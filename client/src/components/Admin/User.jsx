import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../actions";
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
    <div className="main-container-user">
      <div className="container-user" key={props.id}>
        <img src={props.img} alt="" className="img-user" width={100} />
        <h2 className="datos">
          Name: <span className="props">{props.nombre}</span>
        </h2>
        <h2 className="datos">
          Country: <span className="props">{props.pais}</span>
        </h2>
        <h2 className="datos">
          City/State: <span className="props">{props.ciudad}</span>
        </h2>
        <h2 className="datos">
          Adress: <span className="props">{props.direccion}</span>
        </h2>
        <h2 className="datos">
          Email: <span className="props">{props.email}</span>
        </h2>
        <h2 className="datos">
          Password:{" "}
          <span className="props">{props.password.replace(/[^\s]/g, "*")}</span>
        </h2>
        <h2 className="datos">
          Role: <span className="props">{props.rol}</span>
        </h2>
        <h2 className="datos">
          State: <span className="props">{props.estado}</span>
        </h2>
        <br />
      </div>
      <button className="btn-users" onClick={handleChangeStatus}>
        {user.estado === "activo" ? "Disable state" : "Activate state"}
      </button>
      <button className="btn-users" onClick={handleChange}>
        {user.rol === "user" ? "Convert to admin" : "convert to user"}
      </button>
    </div>
  );
}
