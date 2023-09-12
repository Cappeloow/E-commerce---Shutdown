import ProductCard from "./ProductCard";
import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";

function CartMain() {
  const { cart } = useCartContext();

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
    const { url } = await response.json();
    window.location = url;
  };

  const totalSum = () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return totalPrice;
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
      <button onClick={handlePayment}>GE MIG PENGAR</button>
    </main>
  );
}

export default CartMain;
