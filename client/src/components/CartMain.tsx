import ProductCard from "./ProductCard";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
function CartMain() {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const { cart } = useCartContext();
  const { loginUser } = useUserContext();
  useEffect(() => {
    console.log(cart);
  }, []);

  const handlePayment = async () => {
    console.log(cart);
    const response = await fetch("api/checkout/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (!response.ok) {
      return;
    }
    const { url, id } = await response.json();
    localStorage.setItem("session-id", id);
    window.location = url;
  };

  const totalSum = () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return totalPrice;
  };

  const handleOpen = (type: string) => {
    setLoginIsOpen(true);
  };

  return (
    <main className="allProductsContainer">
      {cart &&
        cart.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      <p>Totala kostnaden: {totalSum()} kr</p>
      {loginUser ? (
        <button onClick={handlePayment}>Betala</button>
      ) : (
        <>
          <button onClick={() => handleOpen("login")}>Login</button>
          {isLoginOpen ? <LoginForm setLoginIsOpen={setLoginIsOpen} /> : null}
          <button disabled>Betala</button>
        </>
      )}
    </main>
  );
}

export default CartMain;
