import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export const Cartcontext = createContext(0);

export default function CartContextProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  const [totalCartPrice, settotalCartPrice] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(null);
  const [cartId, setcartId] = useState(null)
  // *------ADD PRODUCT TO CART-----
  async function addProductToCart(id) {
    let toastId = toast.loading("Adding ...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: { token: token } }
      );
      console.log(data);
      toast.success(data.message);
      getCartProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
  // *------GET PRODUCTS FROM CART-----
  async function getCartProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("cart of logged user", data);
      console.log("cart Id", data.cartId);
      setcartId(data.cartId)
      console.log("number of cart items", data.numOfCartItems);
      setnumOfCartItems(data.numOfCartItems);
      console.log("total cart price ", data.data.totalCartPrice);
      console.log("array of cart of user", data.data.products);

      setCartInfo(Array.isArray(data.data.products) ? data.data.products : []);

      settotalCartPrice(data.data.totalCartPrice);
    } catch (error) {
      console.log(error);
    }
  }
  // *------Remove specific cart Item-----

  async function removeProductFromCart(productId) {
    let toastId = toast.loading("Deleting Product...");
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: token },
        }
      );

      console.log("response for removed item from cart", data);

      if (data.status === "success") {
        // ✅ Update cart info by filtering out the removed product
        setCartInfo((prevCart) =>
          prevCart.filter((item) => item.product._id !== productId)
        );

        // ✅ Update total price and number of items
        settotalCartPrice(data.data.totalCartPrice);
        setnumOfCartItems(data.numOfCartItems);

        toast.success("product deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error removing product");
    } finally {
      toast.dismiss(toastId);
    }
  }
  // *------Clear user cart-----

  async function clearUserCart() {
    try {
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: token },
        }
      );
      console.log("response from clearUserCart ", data);
      if (data.message === "success") {
        toast.success("Deleted all Cart");
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // *-----Update cart product quantity-----

  async function updateProductCount(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: { token: token },
        }
      );
      console.log(data, "response of update count");
      if (data.status === "success") {
        // ✅ Update the cartInfo state directly
        setCartInfo((prevCart) =>
          prevCart.map((item) =>
            item.product._id === productId ? { ...item, count: count } : item
          )
        );
        settotalCartPrice(data.data.totalCartPrice);
      setnumOfCartItems(data.numOfCartItems);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Cartcontext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        totalCartPrice,
        numOfCartItems,
        removeProductFromCart,
        clearUserCart,
        updateProductCount,
        cartId
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
