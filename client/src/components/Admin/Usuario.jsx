import { useEffect } from "react";
import { getAllUsers } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import NavBar from "../Navbar/Navbar";

export default function AllUsers() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(getAllUsers());
  });
  //console.log(usuario.usuarios);

  return (
    <div>
      <NavBar />
      <div>
        {usuario.usuarios?.map((e) => (
          <div key={e.id}>
            <User
              img={e.img}
              id={e.id}
              nombre={e.nombre}
              email={e.email}
              password={e.password}
              pais={e.pais}
              ciudad={e.ciudad}
              rol={e.rol}
              estado={e.estado}
            />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
