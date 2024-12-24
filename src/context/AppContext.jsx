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
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);

  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("authToken"); // Get token from session storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleCloseModal = () => {
    setIsCartModalOpen(false);
  };

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const savedUser = JSON.parse(sessionStorage.getItem("user"));
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
      const response = await axios.get("http://172.16.15.171:5001/user-assets");
      const userAssetsData = response.data.find(
        (item) => item.useremail === useremail
      );
      const cartAssetIds = userAssetsData?.userassetsdata?.cartassets || [];

      // Fetch full asset details
      const assetsResponse = await axios.get(
        "http://172.16.15.171:5001/assets"
      );
      const allAssets = assetsResponse.data;

      const cartAssetsDetails = allAssets.filter((asset) =>
        cartAssetIds.includes(asset.id)
      );

      setCartAssets(cartAssetsDetails);
      sessionStorage.setItem("cartAssets", JSON.stringify(cartAssetsDetails)); // Persist in sessionStorage
    } catch (error) {
      console.error("Error fetching cart assets:", error);
    }
  };

  const addToCart = async (asset) => {
    try {
      const response = await axios.post(
        "http://172.16.15.171:5001/add-to-cart",
        {
          useremail: user.email,
          assetId: asset.id,
        }
      );
      const updatedCart = [...cartAssets, response.data.asset];
      setCartAssets(updatedCart);
      sessionStorage.setItem("cartAssets", JSON.stringify(updatedCart)); // Update sessionStorage
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (assetId) => {
    try {
      await axios.post("http://172.16.15.171:5001/remove-from-cart", {
        useremail: user.email,
        assetId,
      });
      const updatedCart = cartAssets.filter((item) => item.id !== assetId);
      setCartAssets(updatedCart);
      sessionStorage.setItem("cartAssets", JSON.stringify(updatedCart)); // Update sessionStorage
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const fetchUserAssets = async (useremail) => {
    try {
      const response = await axios.get("http://172.16.15.171:5001/user-assets");
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
        `http://172.16.15.171:5001/verify-token`,
        {
          token,
        }
      );
      const newAuthToken = response.data.token;
      const userData = response.data.user;

      // Store the auth token and user data
      sessionStorage.setItem("authToken", newAuthToken);
      sessionStorage.setItem("user", JSON.stringify(userData));

      setAuthToken(newAuthToken); // Update the authToken state
      setUser(userData); // Update the user state
      setIsLogin(true); // Set login status to true
      setExaCredits(userData.exaCredits); // Update exa credits

      // Optionally fetch the cart and other data after login
      await fetchCartAssets(userData.email);
      const fetchedAssets = await axios.get("http://172.16.15.171:5001/assets");
      const savedAssetIds = await fetchUserAssets(userData.email);
      updateAssetsWithSavedStatus(fetchedAssets.data, savedAssetIds);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
    }
    setUser(null);
    setAuthToken(null);
    setIsLogin(false);
    setCartAssets([]);
    sessionStorage.removeItem("cartAssets"); // Clear sessionStorage

    try {
      const fetchedAssets = await axios
        .get("http://172.16.15.171:5001/assets")
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
      const token = sessionStorage.getItem("authToken");
      const userData = sessionStorage.getItem("user");

      try {
        const fetchedAssets = await axios
          .get("http://172.16.15.171:5001/assets")
          .then((res) => res.data);

        if (token && userData) {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            console.log("Token expired, clearing storage");
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("user");
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

  const handleSaveClick = async (assetId, isSaved, title) => {
    const useremail = user?.email;

    if (!useremail) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Optimistically update the UI
      const newSavedStatus = !isSaved;

      // Make the API call to update the saved status
      await axios.post("http://172.16.15.171:5001/update-user-assets-saved", {
        useremail,
        assetId,
        status: newSavedStatus,
      });

      // Update global state with the updated assets
      const updatedAssets = assets.map((asset) =>
        asset.id === assetId ? { ...asset, isSaved: newSavedStatus } : asset
      );

      setAssets(updatedAssets); // Update global state
      sessionStorage.setItem("assets", JSON.stringify(updatedAssets)); // Store updated assets in session storage

      console.log(
        `Asset ${newSavedStatus ? "saved" : "unsaved"} successfully.`
      );

      // Optionally re-fetch assets from the backend to ensure consistency
      fetchUserAssets();
      await fetchCartAssets(user.email);
      const fetchedAssets = await axios.get("http://172.16.15.171:5001/assets");
      const savedAssetIds = await fetchUserAssets(user.email);
      updateAssetsWithSavedStatus(fetchedAssets.data, savedAssetIds);
    } catch (error) {
      console.error("Error updating saved status in backend:", error);

      // Revert UI state if the API call fails
      // Handle error states here if needed
    }
  };

  const handleClickOnMyProfile = () => {
    setIsMyProfileModalOpen(true); // Open the modal
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
        exaCredits,
        setExaCredits,
        assets,
        loadingAssets,
        fetchUserAssets,
        cartAssets,
        addToCart,
        removeFromCart,
        setIsCartModalOpen,
        isCartModalOpen,
        handleCloseModal,
        setTotalPrice,
        totalPrice,
        handleSaveClick,
        // fetchUserData,
        isMyProfileModalOpen,
        setIsMyProfileModalOpen,
        handleClickOnMyProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
