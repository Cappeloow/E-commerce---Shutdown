import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ProductProvider from "./context/ProductContext.tsx";
import UserProvider from "./context/UserContext.tsx";
import CartProvider from "./context/CartContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  // <UserProvider>
  //   <ProductProvider>
  //     <CartProvider>
  <App />
  //     </CartProvider>
  //   </ProductProvider>
  // </UserProvider>
  // </React.StrictMode>
);
