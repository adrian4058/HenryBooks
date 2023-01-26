import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useEffect, useState } from "react";

export default function LoginGoogle() {
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const [user, setUser] = useState([]);
  //const history = useHistory();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    setUser(res.profileObj);
    //history.push("/home");
  };

  const onFailure = () => {
    alert("Someting went wrong");
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <img src={user.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientID}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          className="navbar-btn__option"
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText={"Login with Google"}
          cookiePolicy={"single_host_policy"}
          isSignedIn={true}
        />
      )}
    </div>
  );
}
