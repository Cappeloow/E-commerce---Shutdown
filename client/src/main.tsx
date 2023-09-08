import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ProductProvider from "./context/ProductContext.tsx";
import UserProvider from "./context/UserContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UserProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </UserProvider>
  // </React.StrictMode>
);
