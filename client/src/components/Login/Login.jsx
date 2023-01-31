import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
//import LoginGoogle from "../GoogleLogin/GoogleLogin";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";

const Login = () => {
  const cookie = new Cookies();
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Should be a valid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Min. 6 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      console.log(values);
      console.log(data);
      const response = await fetch("http://localhost:7415/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      console.log(parseRes);
      cookie.set("email", data.email, { path: "/" });
      alert(`welcome ${data.email.split("@")[0]}`);
      window.location.href = "./home";
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="register">
        <div className="all-content">
          <div className="register-container">
            <h1>Register here!</h1>
            <div className="content">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                placeholder="E-mail"
                {...getFieldProps("email")}
                className={`${touched.email && errors.email && "error_input"}`}
              />
              <div className="adv">
                {touched.email && errors.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Password"
                {...getFieldProps("password")}
                className={`${touched.password &&
                  errors.password &&
                  "error_input"}`}
              />
              <div className="adv">
                {touched.password && errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <button type="submit" className="botsub">
                Log In
              </button>
              <p>Don't have any account?</p>
              <Link to="/register" className="link">
                {" "}
                Register here!{" "}
              </Link>
              <br />
              <p>Or</p>
              {/* <LoginGoogle /> */}
              <br />
              <div className="login">
                <div>
                  {isAuthenticated ? (
                    <button
                      className="navbar-btn__option"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      className="navbar-btn__option"
                      onClick={() => loginWithPopup()}
                    >
                      <i class="fa-brands fa-google"></i>
                    </button>
                  )}
                </div>
              </div>
              <br />
              <div className="navbar-options__link">
                <Link to="/home">
                  <button className="form-btn">
                    <b>Home</b>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
