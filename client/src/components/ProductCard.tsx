import React from "react";
import "./styles/ProductCard.css";
import { useCartContext } from "../context/CartContext";

function ProductCard({ product }: any) {
  const { addProductToCart } = useCartContext();

  const handleCartPage = window.location.href.includes("localhost:5173/cart");

  return (
    <div className="productContainer">
      <div className="productImgContainer">
        <img className="productImage" src={product.images[0]} alt="" />
      </div>
      <h4>{product.name}</h4>
      <p>
        {handleCartPage ? `${product.quantity} x` : null} {product.price} kr
      </p>
      <button onClick={() => addProductToCart(product)}>BUY</button>
    </div>
  );
}

export default ProductCard;
