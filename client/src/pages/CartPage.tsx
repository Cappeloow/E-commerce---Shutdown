import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartMain from "../components/CartMain";
type Props = {};

function CartPage({}: Props) {
  return (
    <div>
      <Header />
      <CartMain />
      <Footer />
    </div>
  );
}

export default CartPage;
