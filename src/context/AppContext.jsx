import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext({});

export function useAppData() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info
  const [authToken, setAuthToken] = useState(null); // Store JWT
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axios.post(
        `${"http://localhost:5000"}/verify-token`,
        { token }
      );

      console.log("User verified successfully:", response.data.user);

      // Store the custom JWT in localStorage
      const newAuthToken = response.data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", newAuthToken);
      }

      // Set user info and token in state
      setUser(response.data.user);
      setIsLogin(true);
      setAuthToken(newAuthToken);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for an existing token in localStorage on page load
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT
        console.log("Decoded token:", decodedToken);

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.log("Token expired, clearing storage");
          localStorage.removeItem("authToken");
        } else {
          // Restore user session
          setAuthToken(token);
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
          });
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []); // Run once on component mount

  useEffect(() => {
    if (!authToken) return;

    const decodedToken = jwtDecode(authToken);
    const timeUntilExpiry = Math.max(0, decodedToken.exp * 1000 - Date.now()); // Time in milliseconds

    const timeout = setTimeout(() => {
      console.log("Token expired, logging out");
      handleLogout();
    }, timeUntilExpiry);

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, [authToken]); // Run when authToken changes

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken"); // Clear token from storage
    }
    setUser(null); // Clear user state
    setAuthToken(null);
    setIsLogin(false);
    console.log("User logged out");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        handleLoginSuccess,
        authToken,
        setAuthToken,
        isLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
