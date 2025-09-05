import React, { createContext, useState } from "react";

import {registerUser,loginUser} from "../api/auth"

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   if (savedUser) setUser(JSON.parse(savedUser));
  // }, []);

  const login = (userData) => {
    // localStorage.setItem("user", JSON.stringify(userData));
    try {
      const loggedInUser = loginUser(userData);
      loggedInUser.then((data) => {
        if (data instanceof Error){
          window.alert(`Login issue: ${data.message}`);
          setUser(null);
        } else {
          setUser(data);
        }
      });
    } catch (error) {
      setUser(null);
    }
  };

  const logout = () => {
    // localStorage.removeItem("user");
    setUser(null);
  };

  const register = (userData) => {
    // localStorage.setItem("user", JSON.stringify(userData));
    registerUser(userData);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
