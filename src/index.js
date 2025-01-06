import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext";

//google clientId
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error(
    "Google Client ID is missing! Please add it to your .env file."
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </AppProvider>
  </React.StrictMode>
);
