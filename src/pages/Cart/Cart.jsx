import React, { useContext, useEffect } from "react";
import { Cartcontext } from "../../context/CartContext";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = () => {
  const {
    getCartProducts,
    cartInfo,
    totalCartPrice,
    numOfCartItems,
    clearUserCart,
  } = useContext(Cartcontext);
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartInfo === null ? ( // Show Loading only while fetching data
        <Loading />
      ) : cartInfo.length === 0 ? ( // Show empty cart message when there are no items
        <div className="mt-6 shadow-sm bg-gray-100 p-5 flex flex-col items-center justify-center gap-3 rounded-lg">
          <h1 className="text-md text-gray-800 font-semibold">
            Your Cart Is Empty. Start Shopping Now By Clicking The Button Below
          </h1>
          <Link
            to="/"
            className="btn bg-primary-800 text-white hover:bg-primary-900"
          >
            Back To Home
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-5">
            <span>
              <i className="fa-brands fa-opencart text-2xl text-primary-800"></i>
            </span>
            <h1 className="font-bold text-3xl text-primary-900">Shop Cart</h1>
          </div>
          <section className="space-y-4">
            {cartInfo.map((item) => (
              <CartItem key={item.product._id} productInfo={item} />
            ))}
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold bg-slate-100 p-1 rounded-lg">
                <i className="fa-solid fa-dollar-sign"></i> Your Total Price is{" "}
                <span className="ms-3 text-primary-950">
                  {totalCartPrice} L.E
                </span>
              </p>
              <button
                onClick={clearUserCart}
                className="btn ms-6  bg-red-600 text-white hover:bg-red-700"
              >
                <i className="mr-1 fa-solid fa-trash"></i> Delete All Cart
              </button>
            </div>
          </section>
          <Link
            to={"/checkout"}
            className="w-full inline-block text-center text-white font-bold text-xl mt-5  btn bg-primary-800 hover:bg-primary-900"
          >
            Order Now
          </Link>
        </>
      )}
    </>
  );
};

export default Cart;
