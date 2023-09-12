import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import Confirmation from "./pages/confirmation";
import "./global.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
