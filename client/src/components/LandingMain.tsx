import React from "react";
import { useProductContext } from "../context/ProductContext";
type Props = {};
import ProductCard from "./ProductCard";
import "./styles/Main.css";
function LandingMain({}: Props) {
  const { products } = useProductContext();
  console.log(products);

  return (
    <>
      <div className="HeroSection">
        <h1>S H U T D O W N</h1>
        <p>GET YOUR CAP AND TAKE A NAP</p>
      </div>

      <div className="Shop">
        <h1>Our Cap's</h1>
      </div>

      <main className="allProductsContainer">
        {products &&
          products.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
      </main>
    </>
  );
}

export default LandingMain;
