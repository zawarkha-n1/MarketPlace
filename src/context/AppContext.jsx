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
  const [exaCredits, setExaCredits] = useState(0);
  const [assets, setAssets] = useState([]); // Global assets data

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axios.post(
        `${"http://172.16.15.155:5000"}/verify-token`,
        { token }
      );
      console.log("User verified successfully:", response.data.user);

      const newAuthToken = response.data.token;
      const userData = response.data.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", newAuthToken);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data to local storage
      }

      setUser(userData);
      setIsLogin(true);
      setAuthToken(newAuthToken);
      setExaCredits(userData.exaCredits);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user"); // Get user data from localStorage

    if (token && userData) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (decodedToken.exp < currentTime) {
          console.log("Token expired, clearing storage");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        } else {
          // Restore authToken and user state
          setAuthToken(token);
          setIsLogin(true);
          setUser(JSON.parse(userData)); // Parse and set the user data
          setExaCredits(JSON.parse(userData).exaCredits || 0); // Restore credits
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
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
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://172.16.15.155:5000/assets");
      setAssets(response.data); // Save fetched data to global variable
      console.log("Fetched Assets Data:", response.data); // Log fetched data
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchAssets(); // Fetch assets when the component mounts
  }, []);
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
        // handleEmailSignIn,
        exaCredits,
        assets, // Expose assets in context
        fetchAssets, // Optional: Expose fetch function for manual refresh
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
