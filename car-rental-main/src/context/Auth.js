import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:9000/api";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    if (user && token) {
      setAuth({ user: JSON.parse(user), token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
