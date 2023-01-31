// import React, {useEffect} from "react"
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";


// const userProfile = ({setAuth}) => {



//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("token");
//     setAuth(false);
//   };
//   function handleEdit() {
//     window.location.assign("https://localhost:3000/profile/edit");
//   }
  

// return (
    
//         // <div className="info">
//         //   <div className="headatos">
//         //     <h3 className="tituloAccount"> Datos personales </h3>
//         //     <Link className="editAcc" onClick={handleEdit}>
//         //       {" "}
//         //       Editar datos{" "}
//         //     </Link>
//         //   </div>

//         //   <div className="usuario">
//         //     {/* <div className="usuarioimg">
//         //       <img
//         //         className="datoimg"
//         //         name="image"
//         //         value={user.image}
//         //         src={user.image? user.image : imagedefault}
//         //         width="120px"
//         //       ></img>
//         //     </div> */}
//         //     <div>
//         //       <h3 className="dato" name="name" value={user.name}>
//         //         {" "}
//         //         Nombre: {user.name}{" "}
//         //       </h3>
//         //       <h3 className="dato" name="lastName" value={user.lastName}>
//         //         {" "}
//         //         Apellido: {user.lastName}{" "}
//         //       </h3>
              
//         //       <h3 className="dato" name="email" value={user.email}>
                
//         //         {" "}
//         //         Mail: {user.email}{" "}
//         //       </h3>
//         //       <h3 className="dato" name="password" value={user.password}>
//         //         {" "}
//         //         Contraseña: **********{" "}
//         //       </h3>
//         //     </div>
//           // </div>
//         //   <button className="logoutBtn" onClick={(e) => logout(e)}>
//         //     Logout
//         //   </button>
//         // </div>
     
//   );
// }

// export default userProfile