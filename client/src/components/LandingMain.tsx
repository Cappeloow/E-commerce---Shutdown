import React from "react";
import { useProductContext } from "../context/ProductContext";
type Props = {};
import ProductCard from "./ProductCard";
import "./styles/Main.css";
function LandingMain({}: Props) {
  const { products } = useProductContext();
  console.log(products);

  return (
    <main className="allProductsContainer">
      {products &&
        products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
    </main>
  );
}

export default LandingMain;
