import { useEffect } from "react";
import { getAllUsers } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import "./Usuario.css";
//import NavBar from "../Navbar/Navbar";

export default function AllUsers() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(getAllUsers());
  });
  //console.log(usuario.usuarios);

  return (
    <div className="Users">
      {/* <NavBar /> */}
      {usuario.usuarios?.map((e) => (
        <div className="Users-content" key={e.id}>
          <User
            img={e.img}
            id={e.id}
            nombre={e.nombre}
            pais={e.pais}
            ciudad={e.ciudad}
            direccion={e.direccion}
            email={e.email}
            password={e.password}
            rol={e.rol}
            estado={e.estado}
          />
          <br />
        </div>
      ))}
    </div>
  );
}
