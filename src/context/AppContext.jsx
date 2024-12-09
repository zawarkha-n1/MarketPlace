import React, { createContext, useContext, useState, useEffect } from "react";
export const AppContext = createContext({});
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function useAppData() {
  return useContext(AppContext);
}

const [user, setUser] = useState(null); // Store user info
const [authToken, setAuthToken] = useState(null); // Store JWT

const handleLoginSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;

  try {
    const response = await axios.post("http://localhost:5000/verify-token", {
      token,
    });

    console.log("User verified successfully:", response.data.user);

    // Store the custom JWT in localStorage
    const newAuthToken = response.data.token;
    localStorage.setItem("authToken", newAuthToken);

    // Set user info and token in state
    setUser(response.data.user);
    setAuthToken(newAuthToken);
  } catch (error) {
    console.error("Error verifying user:", error);
  }
};

useEffect(() => {
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
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const timeUntilExpiry = decodedToken.exp * 1000 - Date.now(); // Time in milliseconds

    const timeout = setTimeout(() => {
      console.log("Token expired, logging out");
      handleLogout();
    }, timeUntilExpiry);

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }
}, [authToken]); // Run when authToken changes

const handleLogout = () => {
  localStorage.removeItem("authToken"); // Clear token from storage
  setUser(null); // Clear user state
  setAuthToken(null);
  console.log("User logged out");
};

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
