import React, { useContext, useState } from "react";
import { Cartcontext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { WishListContext } from "../../context/WishListContext";

const Card = ({ productObject }) => {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const handleWishlistClick = () => {
    Addproducttowishlist(id);
    setIsInWishlist(!isInWishlist);  
  };
  const {
    imageCover,
    price,
    title,
    category,
    description,
    ratingsAverage,
    id,
  } = productObject;
  const { addProductToCart } = useContext(Cartcontext);
  const { Addproducttowishlist } = useContext(WishListContext);
  return (
    <>
      <div className="card group/card  border-2 border-primary-500 rounded-lg shadow-lg overflow-hidden space-y-3">
        <div className="relative ">
          <img
            src={imageCover}
            alt={title}
            className="w-full h-full object-contain"
          />
          <div className="layer group-hover/card:opacity-100 opacity-0 transition-opacity duration-300 gap-3 bg-slate-800 bg-opacity-50 absolute w-full h-full left-0 top-0 flex justify-center items-center">
          <i
              onClick={handleWishlistClick}
              className={`cursor-pointer fa-solid fa-heart text-white w-8 h-8 rounded-full flex justify-center items-center transition-colors duration-300 ${
                isInWishlist ? "bg-red-500" : "bg-primary-800"
              }`}
            ></i>
            
            
            
            
            
            <i
              onClick={() => {
                addProductToCart(id);
              }}
              className="cursor-pointer fa-solid fa-cart-shopping bg-primary-800 text-white w-8 h-8  rounded-full flex justify-center items-center"
            ></i>
            <Link to={`/product/${id}`}>
              <i className="cursor-pointer fa-solid fa-eye bg-primary-800 text-white w-8 h-8  rounded-full flex justify-center items-center"></i>
            </Link>
          </div>
        </div>
        <div className="cardBody p-4 ">
          <h3 className="text-lg text-gray-300 font-semibold line-clamp-2">
            <Link to={`/product/${id}`}> {title}</Link>
          </h3>
          <h4 className=" text-primary-600 font-semibold">{category.name}</h4>
          <p className="text-gray-400 text-sm line-clamp-2 my-2">
            {description}
          </p>
          <div className="flex justify-between items-center  mt-3">
            <span className="text-slate-300">{price} EGP</span>
            <div>
              <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
              <span className="text-slate-300">{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
