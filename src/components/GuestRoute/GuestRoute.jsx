
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const GuestRoute = ({ children }) => {
 const { token } = useContext(UserContext);
  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default GuestRoute;
