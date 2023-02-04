import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch /*useSelector*/ } from "react-redux";
import { asyncRegisterAuth0 } from "../../actions/index";
import { FcGoogle } from "react-icons/fc";

function Auth0() {
  const dispatch = useDispatch();
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0();
  console.log(user);
  useEffect(() => {
    if (user) {
      dispatch(
        asyncRegisterAuth0({
          nombre: user.given_name,
          email: user.email,
          password: "12345asd",
          //image: user.picture,
        })
      );
    }
  }, [user]);
  function login() {
    loginWithPopup();
  }
  return (
    <div className="Login-google">
      {isAuthenticated ? (
        <button
          className="Login-google__btn"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <FcGoogle />
          <span>Logout</span>
        </button>
      ) : (
        <button className="Login-google__btn" onClick={login}>
          <FcGoogle />
          <span>Continue With Google</span>
        </button>
      )}
    </div>
  );
}

export default Auth0;
