import React, { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WishListContext";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import WishlistIem from "../../components/WishlistIem/WishlistIem";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { Getloggeduserwishlist, allWishList } = useContext(WishListContext);
  useEffect(() => {
    Getloggeduserwishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {allWishList ? (
        <>
          {allWishList.length === 0 ? (
            <p className="text-slate-400 text-center my-5 text-2xl font-bold">
              Your Wish List is Empty Go To <Link className="text-primary-800" to="/">Home</Link> To Have Some Products 
              
            </p>
          ) : (
            <section>
              {allWishList.map((item) => (
                <WishlistIem key={item.id} productInfo={item} />
              ))}
            </section>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Wishlist;
