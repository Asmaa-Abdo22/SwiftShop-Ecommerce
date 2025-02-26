import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const WishListContext = createContext(null);
export default function WishListContextProvider({ children }) {
  const [allWishList, setallWishList] = useState(null);
  // *------ADD PRODUCT TO WISHLIST-----
  const { token } = useContext(UserContext);
  async function Addproducttowishlist(id) {
    const toastId = toast.loading("Adding Product to wishlist ..");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: { token },
        }
      );
      console.log("addproduct to wishlist", data);

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("can't add product to wishlist");
    } finally {
      toast.dismiss(toastId);
    }
  }
  // *-----Get logged user wishlist-----
  async function Getloggeduserwishlist() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: { token } }
      );
      console.log("Getloggeduserwishlist", data.data);
      setallWishList(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // *-----Remove product from wishlist-----
  async function removeproductfromwishlist(id) {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token } }
      );
      console.log("remove from wish list", data.data);
      toast.success("Product Deleted Successfully");

      setallWishList((prevWish) => prevWish.filter((item) => item.id !== id));
        Getloggeduserwishlist();
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  return (
    <WishListContext.Provider
      value={{
        Addproducttowishlist,
        Getloggeduserwishlist,
        allWishList,
        removeproductfromwishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
