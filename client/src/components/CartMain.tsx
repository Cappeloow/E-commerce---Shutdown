import ProductCard from "./ProductCard";
import { useCartContext } from "../context/CartContext";

function CartMain() {
  const { cart } = useCartContext();

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
      <button>Checkout</button>
    </main>
  );
}

export default CartMain;
