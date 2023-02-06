import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../actions";
import NavBar from "../Navbar/Navbar";


// import Api from "../Global";
// const url = Api.Url;

export default function UserProfile ({setAuth}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userProfile);
    useEffect(() => {
      dispatch(getUser());
    }, [dispatch]);


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    // setAuth(false);
  };
  // function handleEdit() {
  //   window.location.assign("http://localhost:3000/profile/edit");
  // }
  

return (
    
        <div className="info">
          <NavBar />
          <div className="headatos">
            <h3 className="tituloAccount"> Datos personales </h3>
            <Link to="/profile/edit">
              {" "}
              Editar datos{" "}
            </Link>
          </div>

          <div className="usuario">
            {/* <div className="usuarioimg">
              <img
                className="datoimg"
                name="image"
                value={user.image}
                src={user.image? user.image : imagedefault}
                width="120px"
              ></img>
            </div> */}
            <div>
              <h3 className="dato" name="name" value={user.nombre}>
                {" "}
                Name: {user.nombre}{" "}
              </h3>
            
              <h3 className="dato" name="email" value={user.email}>
                
                {" "}
                Mail: {user.email}{" "}
              </h3>
              <h3 className="dato" name="password" value={user.password}>
                {" "}
                Password: **********{" "}
              </h3>
              <h3 className="dato" name="direccion" value={user.direccion}>
                {" "}
                Address: {user.direccion}{" "}
              </h3>
              <h3 className="dato" name="pais" value={user.pais}>
                {" "}
                Country: {user.pais}{" "}
              </h3>
              <h3 className="dato" name="ciudad" value={user.ciudad}>
                {" "}
                City/State: {user.ciudad}{" "}
              </h3>
            </div>
          </div>
          <button className="logoutBtn" onClick={(e) => logout(e)}>
            Logout
          </button>
        </div>
     
  );
}
