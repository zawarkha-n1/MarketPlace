import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext";

//google clientId
const clientId =
  "186730001178-dlu70b3topu1sr8kcuv6ckguf6tah2no.apps.googleusercontent.com";

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
