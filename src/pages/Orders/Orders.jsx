import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);

  async function getUserOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setAllOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (!allOrders.length) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section className="p-4">
        {allOrders.map((order) => (
          <div
            key={order._id}
            className="order my-4 p-4 rounded-md border-2 border-gray-300"
          >
            <header className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white">
                <h2 className="text-xl mb-2">Order Id</h2>
                <span className="text-xl font-semibold">#{order.id}</span>
              </div>
              <div className="mt-4 md:mt-0">
                {order.isPaid ? (
                  <span className="p-3 bg-green-500 inline-block text-white font-semibold mx-2 rounded-lg">
                    Paid
                  </span>
                ) : (
                  <span className="p-3 bg-red-500 inline-block text-white font-semibold mx-2 rounded-lg">
                    Unpaid
                  </span>
                )}
                {order.isDelivered ? (
                  <span className="p-3 bg-blue-500 inline-block text-white font-semibold mx-2 rounded-lg">
                    Delivered
                  </span>
                ) : (
                  <span className="p-3 bg-yellow-500 inline-block text-white font-semibold mx-2 rounded-lg">
                    Pending delivery
                  </span>
                )}
              </div>
            </header>
            <div className="order-body mt-4 p-4 rounded-md grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="item space-y-4  p-4 rounded-lg border-2 border-primary-800"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-full  object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-200 line-clamp-2">
                    <Link to={`/product/${item.product.id}`}>
                      {" "}
                      {item.product.title}
                    </Link>
                  </h3>
                  <div className="flex justify-between items-center flex-col">
                    <span className="text-[18px] text-gray-200 font-semibold">
                      <span className="text-red-500"> count</span> :{" "}
                      {item.count}
                    </span>
                    <span className="text-[18px] text-primary-200 font-semibold">
                      {item.price} L.E
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-300 font-semibold">
              Your Total Order Price is :{" "}
              <span className="font-bold text-primary-800 ">
                {order.totalOrderPrice}
              </span>{" "}
              L.E
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Orders;
