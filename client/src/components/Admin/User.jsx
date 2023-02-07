import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../actions";

export default function User(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    id: props.id,
    rol: props.rol,
    estado: props.estado,
    nombre: props.nombre,
    email: props.email,
    password: props.password,
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
    <div>
      <div key={props.id}>
        <h1>id: {props.id}</h1>
        <img src={props.img} alt="" className="user-img" />
        <h1>nombre: {props.nombre}</h1>
        <h1>email: {props.email}</h1>
        <h1>password: {props.password}</h1>
        <h1>pais: {props.pais}</h1>
        <h1>ciudad: {props.ciudad}</h1>
        <h1>rol: {props.rol}</h1>
        <h1>estado: {props.estado}</h1>
        <br />
      </div>
      <button onClick={handleChangeStatus}>
        {user.estado === "activo" ? "Desactive" : "Active"}
      </button>
      <button onClick={handleChange}>
        {user.rol === "user" ? "admin" : "user"}
      </button>
    </div>
  );
}
