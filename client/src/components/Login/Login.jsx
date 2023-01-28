import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginGoogle from "../GoogleLogin/GoogleLogin";
import "./Login.css";

const Login = () => {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Should be a valid email").required("Required"),
      password: Yup.string().min(6, "Min. 6 characters").required("Required"),
    }),

    // onSubmit: async (values) => {
    //   const data = {
    //     email: values.email,
    //     password: values.password,
    //   };
    //   console.log(values);
    //   console.log(data);
    //   const response = await fetch("http://localhost:7415/auth/signin", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   const parseRes = await response.json();
    //   localStorage.setItem("token", parseRes.token);
    //   console.log(parseRes);
    // },
  });

  return (
    <form className="formulario">
      <div className="form-container">
        <label htmlFor="email" className="form-label">
          E-mail:
        </label>
        <input
          type="email"
          placeholder="E-mail"
          {...getFieldProps("email")}
          className={`${touched.email && errors.email && "error_input"}`}
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}

        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          placeholder="Password"
          {...getFieldProps("password")}
          className={`${touched.password && errors.password && "error_input"}`}
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}

        <div>
          <button type="submit" onSubmit={handleSubmit} className="form-btn">
            Log In
          </button>
        </div>

        <p>
          Don't have any account?
          <Link to="/register" className="link">
            {" "}
            Register here!{" "}
          </Link>
        </p>

        <div>
          <p>Or</p>
          <LoginGoogle />
        </div>
        <div className="navbar-options__link">
          <Link to="/home">
            <button className="form-btn">
              <b>Home</b>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
