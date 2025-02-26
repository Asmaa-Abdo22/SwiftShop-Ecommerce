import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);
export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [userData, setuserData] = useState(
    localStorage.getItem("userData") || null
  );
  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    setuserData(null)
    localStorage.removeItem("userData")
  }
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", userData); 
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{ token, setToken, logOut, setuserData, userData }}
    >
      {children}
    </UserContext.Provider>
  );
}
