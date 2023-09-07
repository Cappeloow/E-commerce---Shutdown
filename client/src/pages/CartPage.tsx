import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartMain from "../components/CartMain";
type Props = {};

function CartPage({}: Props) {
  return (
    <>
      <Header />
      <CartMain />
      <Footer />
    </>
  );
}

export default CartPage;
