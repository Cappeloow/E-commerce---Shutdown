import React from "react";
import { useProductContext } from "../context/CartContext";
type Props = {};

function LandingMain({}: Props) {
  const { products } = useProductContext();
  const { data } = products;

  return (
    <main>
      {data &&
        data.map((product, index) => (
          <div key={index}>
            <h1>{product.name}</h1>
          </div>
        ))}
    </main>
  );
}

export default LandingMain;
