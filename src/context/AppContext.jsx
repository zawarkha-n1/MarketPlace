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
  const [cartAssets, setCartAssets] = useState([]);

  // const addToCart = (asset) => {
  //   setCartAssets((prev) => {
  //     // Avoid duplicate items in the cart
  //     const exists = prev.find((item) => item.id === asset.id);
  //     if (!exists) {
  //       return [...prev, asset];
  //     }
  //     return prev;
  //   });
  // };

  // const removeFromCart = (assetId) => {
  //   setCartAssets((prev) => prev.filter((item) => item.id !== assetId));
  // };

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
          setUser(savedUser);
          setIsLogin(true);
          await fetchCartAssets(savedUser.email);
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
      }
    };

    initializeCart();
  }, []);

  const fetchCartAssets = async (useremail) => {
    try {
      const response = await axios.get(`http://localhost:5000/user-assets`);
      const userAssetsData = response.data.find(
        (item) => item.useremail === useremail
      );
      const cartAssetIds = userAssetsData?.userassetsdata?.cartassets || [];

      // Fetch full asset details
      const assetsResponse = await axios.get(`http://localhost:5000/assets`);
      const allAssets = assetsResponse.data;

      const cartAssetsDetails = allAssets.filter((asset) =>
        cartAssetIds.includes(asset.id)
      );

      setCartAssets(cartAssetsDetails);
      localStorage.setItem("cartAssets", JSON.stringify(cartAssetsDetails)); // Persist in localStorage
    } catch (error) {
      console.error("Error fetching cart assets:", error);
    }
  };

  const addToCart = async (asset) => {
    try {
      const response = await axios.post("http://localhost:5000/add-to-cart", {
        useremail: user.email,
        assetId: asset.id,
      });
      const updatedCart = [...cartAssets, response.data.asset];
      setCartAssets(updatedCart);
      localStorage.setItem("cartAssets", JSON.stringify(updatedCart)); // Update localStorage
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (assetId) => {
    try {
      await axios.post("http://localhost:5000/remove-from-cart", {
        useremail: user.email,
        assetId,
      });
      const updatedCart = cartAssets.filter((item) => item.id !== assetId);
      setCartAssets(updatedCart);
      localStorage.setItem("cartAssets", JSON.stringify(updatedCart)); // Update localStorage
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

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
      await fetchCartAssets(userData.email);

      const fetchedAssets = await axios
        .get("http://172.16.15.155:5000/assets")
        .then((res) => res.data);
      const savedAssetIds = await fetchUserAssets(userData.email);
      updateAssetsWithSavedStatus(fetchedAssets, savedAssetIds);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
    setUser(null);
    setAuthToken(null);
    setIsLogin(false);
    setCartAssets([]);
    localStorage.removeItem("cartAssets"); // Clear localStorage

    try {
      const fetchedAssets = await axios
        .get("http://172.16.15.155:5000/assets")
        .then((res) => res.data);

      const updatedAssets = fetchedAssets.map((asset) => ({
        ...asset,
        isSaved: false,
      }));

      setAssets(updatedAssets);

      console.log(
        "User logged out and assets updated for non-logged-in state."
      );
      window.location.reload();
    } catch (error) {
      console.error("Error fetching assets after logout:", error);
    }
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
        cartAssets,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
