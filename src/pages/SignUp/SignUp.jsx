import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
const SignUp = () => {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const mySchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "At least 3 characters")
      .max(20, "Name must be less than 20 char"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required "),
    phone: yup
      .string()
      .required("Phone is required ")
      .matches(phoneRegex, "Accept only Egyptian Numbers"),
    password: yup
      .string()
      .required(" Password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: yup
      .string()
      .required("RePassword is required")
      .oneOf([yup.ref("password")], "Password and repassword must match"),
  });
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  async function sendDataToRegister(values) {
    const toastId = toast.loading("Wait ..");
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((resolved) => {
        console.log("Success", resolved);
        toast.success(" Your Account is Added Successfully 🎉");
        setTimeout(() => {
          navigate("/login");
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
    onSubmit: sendDataToRegister,
  });
  return (
    <>
    <Helmet>
        <title>Register</title>
      </Helmet>
      <h1 className="mb-3 text-xl text-primary-700 font-semibold">
        <i className="fa-solid fa-user"></i> Register Now :
      </h1>
      <form className="p-3 space-y-3" onSubmit={myFormik.handleSubmit}>
        <div className="name">
          <label htmlFor="name" className="text-slate-200">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="formControl w-full"
            value={myFormik.values.name}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <p className="text-red-600 mt-1 text-sm">*{myFormik.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="email">
          <label htmlFor="email" className="text-slate-200">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="formControl w-full"
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
          <label htmlFor="password" className="text-slate-200">Password:</label>
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
        <div className="rePassword">
          <label htmlFor="rePassword" className="text-slate-200">rePassword:</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="formControl w-full"
            value={myFormik.values.rePassword}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <p className="text-red-600 mt-1 text-sm">
              *{myFormik.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="phone">
          <label htmlFor="phone" className="text-slate-200">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="formControl w-full"
            value={myFormik.values.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <p className="text-red-600 mt-1 text-sm">
              *{myFormik.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit "
          className="btn bg-primary-700 hover:bg-primary-900 text-white"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default SignUp;
