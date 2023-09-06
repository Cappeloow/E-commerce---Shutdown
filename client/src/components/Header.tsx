import React, { useState, useEffect } from "react";
import "./styles/Header.css";
type Props = {};
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
function Header({}: Props) {
  const [isRegisterOpen, setRegisterIsOpen] = useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const handleOpen = (type: string) => {
    if (type === "login") {
      setLoginIsOpen(true);
      setRegisterIsOpen(false);
    }

    if (type === "register") {
      setRegisterIsOpen(true);
      setLoginIsOpen(false);
    }
  };

  return (
    <header>
      <h1>This is my header</h1>
      <button onClick={() => handleOpen("login")}>Login</button>
      <p onClick={() => handleOpen("register")}>register</p>
      {isRegisterOpen ? (
        <RegisterForm setRegisterIsOpen={setRegisterIsOpen} />
      ) : null}
      {isLoginOpen ? <LoginForm setLoginIsOpen={setLoginIsOpen} /> : null}
    </header>
  );
}

export default Header;
