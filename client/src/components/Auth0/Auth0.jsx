import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterAuth0 } from "../../actions/index";

function Auth0() {
  const dispatch = useDispatch();
  const { loginWithPopup, user } = useAuth0();
  console.log(user);
  useEffect(() => {
    if (user) {
      dispatch(
        asyncRegisterAuth0({
          //nombre: user.given_name,
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
  return <div onClick={login}>Continue with Google</div>;
}

export default Auth0;

//auth_zero: true,
//const { userProfile } = useSelector((state) => state.profile);/*&& !userProfile.ID*/
