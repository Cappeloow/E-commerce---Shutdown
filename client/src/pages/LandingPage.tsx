import React from "react";
import Header from "../components/Header";
import LandingMain from "../components/LandingMain";
import Footer from "../components/Footer";
type Props = {};

function LandingPage({}: Props) {
  return (
    <div>
      <Header />
      <LandingMain />
      <Footer />
    </div>
  );
}

export default LandingPage;
