import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import Confirmation from "./pages/confirmation";
import ProductProvider from "./context/ProductContext.tsx";
import UserProvider from "./context/UserContext.tsx";
import CartProvider from "./context/CartContext.tsx";
import "./global.css";
function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
