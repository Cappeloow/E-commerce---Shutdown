import React, { useState, useEffect } from "react";
import "./styles/Header.css";
type Props = {};

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
        <dialog open>
          <button onClick={() => setRegisterIsOpen(false)}>X</button>
          <p className="dialog-title">Skapa ett nytt rum</p>
          <form method="dialog">
            <input placeholder="Rumsnamn" type="text" />
          </form>
        </dialog>
      ) : null}
      {isLoginOpen ? (
        <dialog open>
          <button onClick={() => setLoginIsOpen(false)}>X</button>
          <p className="dialog-title">Logga in här</p>
          <form method="dialog">
            <input placeholder="Rumsnamn" type="text" />
          </form>
        </dialog>
      ) : null}
    </header>
  );
}

export default Header;
