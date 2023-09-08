import React from "react";

type Props = {};

function ProductCard({ product }: Props) {
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}

export default ProductCard;
