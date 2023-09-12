import React from "react";
import "./styles/ProductCard.css";
import { useCartContext } from "../context/CartContext";

function ProductCard({ product }: any) {
  const { addProductToCart } = useCartContext();

  const handleCartPage = !window.location.href.includes("localhost:5173/cart");

  return (
    <div className="productContainer">
      <div className="productImgContainer">
        <img className="productImage" src={product.images[0]} alt="" />
      </div>
      <h4>{product.name}</h4>
      <p>{product.price} kr</p>
      {handleCartPage ? (
        <button onClick={() => addProductToCart(product)}>BUY</button>
      ) : (
        <p>Antal:{product.quantity}</p>
      )}
    </div>
  );
}

export default ProductCard;
