import React from "react";
import "./styles/Header.css";
type Props = {};

function Header({}: Props) {
  return (
    <header>
      <h1>This is my header</h1>
      <button>Login</button>
      <p>register</p>
    </header>
  );
}

export default Header;
