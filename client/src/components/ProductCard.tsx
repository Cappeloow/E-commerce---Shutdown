import React from "react";
import "./styles/ProductCard.css";
type Props = {};

function ProductCard({ product }: any) {
  console.log(product);
  return (
    <div className="productContainer">
      <div className="productImgContainer">
        <img className="productImage" src={product.images[0]} alt="" />
      </div>
      <h4>{product.name}</h4>
      <p>{product.price} kr</p>
    </div>
  );
}

export default ProductCard;
