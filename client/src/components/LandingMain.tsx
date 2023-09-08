import React from "react";
import { useProductContext } from "../context/CartContext";
type Props = {};
import ProductCard from "./ProductCard";
import "./styles/Main.css";
function LandingMain({}: Props) {
  const { products } = useProductContext();
  const { data } = products;

  return (
    <main>
      {data &&
        data.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
    </main>
  );
}

export default LandingMain;
