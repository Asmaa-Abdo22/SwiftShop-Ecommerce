import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Cartcontext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const [paymentMethod, setpaymentMethod] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { cartId } = useContext(Cartcontext);
  const mySchema = yup.object({
    shippingAddress: yup.object({
      city: yup
        .string()
        .required("City is required")
        .min(3, "At least 3 characters")
        .max(20, "City must be less than 20 char"),
      phone: yup.string().required("Phone is required"),
      details: yup
        .string()
        .required("Details is required")
        .min(3, "At least 3 characters")
        .max(50, "Details must be less than 50 char"),
    }),
  });

  const userData = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };

  async function CreateCashOrder(values) {
    let toastId = toast.loading("we are creating your order ...");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values.shippingAddress,
        },
        {
          headers: { token },
        }
      );
      console.log(data, "cash order func");
      console.log(values.shippingAddress, "valuessss");
      toast.success("Your order has been created");
      setTimeout(() => {
        navigate("/allorders");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Error in your payment ");
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function OnlineOrder(values) {
    let toastId = toast.loading("Preparing payment method ...");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
        {
          shippingAddress: values.shippingAddress,
        },
        {
          headers: { token },
        }
      );
      console.log(data, "online order func");
      console.log(values.shippingAddress, "valuessss");
      toast.success("Your order has been created");
      setTimeout(() => {
        location.href = data.session.url;
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Error in your payment ");
    } finally {
      toast.dismiss(toastId);
    }
  }
  const myFormik = useFormik({
    initialValues: userData,
    validationSchema: mySchema,
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        CreateCashOrder(values);
      } else {
        OnlineOrder(values);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <section>
        <h1 className="text-slate-300 text-2xl font-bold">Shipping Address</h1>
        <form onSubmit={myFormik.handleSubmit} className="my-5">
          <input
            type="text"
            id="shippingAddress.city"
            placeholder="City"
            className="formControl w-full mb-2"
            value={myFormik.values.shippingAddress.city}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.shippingAddress?.city &&
          myFormik.touched.shippingAddress?.city ? (
            <p className="text-red-500 my-1 text-sm">
              *{myFormik.errors.shippingAddress.city}
            </p>
          ) : (
            ""
          )}

          <input
            type="tel"
            id="shippingAddress.phone"
            placeholder="Phone"
            className="formControl w-full mb-2"
            value={myFormik.values.shippingAddress.phone}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          />
          {myFormik.errors.shippingAddress?.phone &&
          myFormik.touched.shippingAddress?.phone ? (
            <p className="text-red-500 my-1 text-sm">
              *{myFormik.errors.shippingAddress.phone}
            </p>
          ) : (
            ""
          )}

          <textarea
            id="shippingAddress.details"
            placeholder="Details"
            className="formControl w-full mb-2 resize-none"
            value={myFormik.values.shippingAddress.details}
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
          ></textarea>
          {myFormik.errors.shippingAddress?.details &&
          myFormik.touched.shippingAddress?.details ? (
            <p className="text-red-500 my-1 text-sm">
              *{myFormik.errors.shippingAddress.details}
            </p>
          ) : (
            ""
          )}
          <div>
            <button
              onClick={() => {
                setpaymentMethod("cash");
              }}
              type="submit"
              className="btn bg-primary-800 hover:bg-primary-900 text-white font-bold "
            >
              Cash Order
            </button>
            <button
              onClick={() => {
                setpaymentMethod("online");
              }}
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-900 text-white font-bold ml-4"
            >
              Online Payment
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Checkout;
