import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext({});

export function useAppData() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [exaCredits, setExaCredits] = useState(0);
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);

  const fetchUserAssets = async (useremail) => {
    try {
      const response = await axios.get("http://172.16.15.155:5000/user-assets");
      const userAssetsData = response.data;

      const currentUserAssets = userAssetsData.find(
        (item) => item.useremail === useremail
      );

      return currentUserAssets?.userassetsdata.savedassets || [];
    } catch (error) {
      console.error("Error fetching user assets:", error);
      return [];
    }
  };

  const updateAssetsWithSavedStatus = (fetchedAssets, savedAssetIds) => {
    const updatedAssets = fetchedAssets.map((asset) => ({
      ...asset,
      isSaved: savedAssetIds.includes(asset.id),
    }));

    setAssets(updatedAssets);
    console.log("Updated Assets with Saved Status:", updatedAssets);
  };

  const fetchAssets = async () => {
    try {
      setLoadingAssets(true);
      const fetchedAssets = await axios
        .get("http://172.16.15.155:5000/assets")
        .then((res) => res.data);

      if (isLogin && user) {
        const savedAssetIds = await fetchUserAssets(user.email);
        updateAssetsWithSavedStatus(fetchedAssets, savedAssetIds);
      } else {
        setAssets(fetchedAssets);
      }

      setLoadingAssets(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setLoadingAssets(false);
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axios.post(
        "http://172.16.15.155:5000/verify-token",
        { token }
      );
      console.log("User verified successfully:", response.data.user);

      const newAuthToken = response.data.token;
      const userData = response.data.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", newAuthToken);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      setUser(userData);
      setIsLogin(true);
      setAuthToken(newAuthToken);
      setExaCredits(userData.exaCredits);

      const fetchedAssets = await axios
        .get("http://172.16.15.155:5000/assets")
        .then((res) => res.data);
      const savedAssetIds = await fetchUserAssets(userData.email);
      updateAssetsWithSavedStatus(fetchedAssets, savedAssetIds);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
    setUser(null);
    setAuthToken(null);
    setIsLogin(false);

    setAssets((prevAssets) =>
      prevAssets.map((asset) => ({ ...asset, isSaved: false }))
    );

    console.log("User logged out");
  };

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");

      try {
        const fetchedAssets = await axios
          .get("http://172.16.15.155:5000/assets")
          .then((res) => res.data);

        if (token && userData) {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            console.log("Token expired, clearing storage");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          } else {
            const parsedUser = JSON.parse(userData);
            setAuthToken(token);
            setIsLogin(true);
            setUser(parsedUser);
            setExaCredits(parsedUser.exaCredits || 0);

            const savedAssetIds = await fetchUserAssets(parsedUser.email);
            updateAssetsWithSavedStatus(fetchedAssets, savedAssetIds);
          }
        } else {
          setAssets(fetchedAssets);
        }
      } catch (err) {
        console.error("Error during app initialization:", err);
        handleLogout();
      } finally {
        setLoadingAssets(false);
      }
    };

    initializeApp();
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
        exaCredits,
        assets,
        loadingAssets,
        fetchUserAssets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
