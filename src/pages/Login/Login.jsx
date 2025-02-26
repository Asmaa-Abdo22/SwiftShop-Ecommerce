import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { setToken ,setuserData} = useContext(UserContext);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const mySchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required "),
    password: yup
      .string()
      .required(" Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const userData = {
    email: "",
    password: "",
  };
  async function sendDataToLogin(values) {
    const toastId = toast.loading("Wait ..");
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((resolved) => {
        console.log(resolved);
        console.log(resolved.data.token, "tokennnnn");
        console.log(resolved.data.user.email, "email");
        localStorage.setItem("userData", resolved.data.user.email); 
        setuserData(resolved.data.user.email, "email")
        localStorage.setItem("token", resolved.data.token);
        setToken(resolved.data.token);
        // getUserData()
        console.log("Success", resolved);
        toast.success("Welcome To Fresh Cart  🎉");
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((regected) => {
        console.log("Error", regected);
        toast.error(`${regected.response.data.message} ⛔`);
      })
      .finally(() => {
        toast.dismiss(toastId);
      });
    console.log(data);
  }
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: sendDataToLogin,
  });
  return (
    <>
      <Helmet>
        <title>LogIn</title>
      </Helmet>

      <h1 className="mb-3 text-xl text-primary-700 font-semibold">
        <i className="fa-solid fa-user"></i> Log In :
      </h1>
      <form className="p-3 space-y-3" onSubmit={myFormik.handleSubmit}>
        <div className="email">
          <label htmlFor="email" className="text-slate-200">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="formControl w-full "
            value={myFormik.values.email}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <p className="text-red-600 mt-1 text-sm">
              *{myFormik.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="password">
          <label htmlFor="password" className="text-slate-200">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="formControl w-full"
            value={myFormik.values.password}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <p className="text-red-600 mt-1 text-sm">
              *{myFormik.errors.password}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit "
          className="btn bg-primary-700 hover:bg-primary-900 text-white"
        >
          LogIn
        </button> 
        <p className="text-slate-400">Don't have an account? <Link className="text-primary-600" to="/signup">Register Now </Link></p>
      </form>
     
    </>
  );
};

export default Login;
