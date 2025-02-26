import React, { useContext } from "react";
import { Cartcontext } from "../../context/CartContext";
import { WishListContext } from "../../context/WishListContext";

const WishlistIem = ({ productInfo }) => {
  const { addProductToCart } =
    useContext(Cartcontext);
  const {  removeproductfromwishlist } =
    useContext(WishListContext);
  const {
    id,
    price,
    title,
    imageCover,
    category,
    description,
    ratingsAverage,
  } = productInfo;

  return (
    <>
      <div className="whishItem p-4 bg-primary-100 border-2 border-primary-900 my-3 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <img
            src={imageCover}
            alt={title}
            className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-full object-contain border-4 border-white"
          />
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <h2 className=" line-clamp-3 text-md text-gray-900 font-semibold">{title}</h2>
            <h3 className="text-sm text-gray-800 font-semibold">
              {category.name}
            </h3>
            <span className="text-sm text-slate-700 font-semibold">
              {price} L.E
            </span>
          </div>
          <div className="flex ms-auto items-center">
            <span className="text-md font-bold text-slate-700">
              {ratingsAverage}
            </span>
            <i className="fa-solid fa-star ms-1 text-yellow-500"></i>
            <i
              onClick={() => {
                removeproductfromwishlist(id);
              }}
              className="fa-solid fa-trash text-red-600 cursor-pointer text-2xl ms-4"
            ></i>
          </div>
        </div>
       <div className="flex justify-center">
       <button
          onClick={() => {
            addProductToCart(id);
          }}
          className=" inline-block text-center text-white font-bold text-md mt-5  btn bg-primary-800 hover:bg-primary-900 "
        >
          Add To Cart
        </button>
       </div>
      </div>
    </>
  );
};

export default WishlistIem;
