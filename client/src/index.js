import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/TextVisibility.css";

// Production console cleanup
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "",
  currency: "USD",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <PayPalScriptProvider options={initialOptions}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PayPalScriptProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
); 