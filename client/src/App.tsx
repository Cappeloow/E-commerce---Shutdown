import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
