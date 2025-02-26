import React, { useContext } from "react";
import { Cartcontext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartItem = ({ productInfo }) => {
  const { count, price, product } = productInfo;
  const { id, imageCover, title, category } = product;
  const { removeProductFromCart, updateProductCount } = useContext(Cartcontext);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1">
        <div className="cartItem bg-gray-100 p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 grow rounded-lg">
          <div className="grow flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={imageCover}
              alt={title}
              className="w-28 h-28 shrink-0 rounded-full object-contain border-4 border-white"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-md text-gray-800 font-semibold mt-2">
                <Link to={`/product/${id}`}>{title}</Link>
              </h2>
              <h4 className="text-gray-500 font-semibold">{category.name}</h4>
            </div>
          </div>
          <div className="count flex gap-3 items-center">
            <div
              onClick={() => {
                updateProductCount(id, count + 1);
              }}
              className="  border-2 cursor-pointer border-primary-700 rounded-lg w-fit p-1"
            >
              <i className="fa-solid fa-plus"></i>
            </div>

            <span className="text-xl">{count}</span>

            <button
            disabled={count==1}
              onClick={() => {
                updateProductCount(id, count - 1);
              }}
              className="cursor-pointer border-2 border-primary-700 rounded-lg w-fit p-1"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
          <span className="ml-4">{price} L.E</span>
        </div>
        <button
          onClick={() => removeProductFromCart(id)}
          className="bg-gray-100 p-3 rounded-lg self-start sm:self-center"
        >
          <i className="fa-solid fa-trash text-red-700 text-xl"></i>
        </button>
      </div>
    </>
  );
};

export default CartItem;
