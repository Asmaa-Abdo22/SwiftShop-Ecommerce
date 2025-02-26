import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import NotFound from "./pages/NotFound/NotFound";
import UserContextProvider from "./context/UserContext";
import CartContextProvider from "./context/CartContext";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import { Offline } from "react-detect-offline";
import Products from "./pages/Products/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wishlist from "./pages/Wishlist/Wishlist";
import Brands from "./pages/Brands/Brands";
import SpecificBrand from "./components/SpecificBrand/SpecificBrand";
import Categories from "./pages/Categories/Categories";
import SubCategories from "./components/SubCategories/SubCategories";
import WishListContextProvider from "./context/WishListContext";
import Profile from "./components/Profile/Profile";

function App() {
  const myClient = new QueryClient();
  const myRouter = createHashRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: `/product/:id`, element: <ProductDetails /> },
        { path: `/checkout`, element: <Checkout /> },
        { path: `/allorders`, element: <Orders /> },
        { path: `/products`, element: <Products /> },
        { path: `/wishList`, element: <Wishlist /> },
        { path: `/brands`, element: <Brands /> },
        { path: `/brands/:id`, element: <SpecificBrand /> },
        { path: `/categories`, element: <Categories /> },
        { path: `/categories/:id/subcategories`, element: <SubCategories /> },
        { path: `/profile`, element: <Profile /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/signup", element: <SignUp /> },
        { path: "/login", element: <Login /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={myRouter} />
            </WishListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>

      <Toaster />
      <Offline>
        <div className="bg-red-500 fixed top-0 left-0 right-0 z-50 text-center p-3 font-bold text-white text-2xl">
          Check your internet connection
        </div>
      </Offline>
    </>
  );
}

export default App;
