import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { AiOutlineUser } from "react-icons/ai";
type Props = {};
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useUserContext } from "../context/UserContext";
import UserProfileModule from "./UserProfileModule";
function Header({}: Props) {
  const { loginUser } = useUserContext();
  const [isRegisterOpen, setRegisterIsOpen] = useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const handleOpen = (type: string) => {
    if (type === "login") {
      setLoginIsOpen(true);
      setRegisterIsOpen(false);
    }

    if (type === "register") {
      setRegisterIsOpen(true);
      setLoginIsOpen(false);
    }

    if (type === "UserProfile") {
      setUserProfile(true);
      setRegisterIsOpen(false);
    }
  };

  return (
    <header>
      <h1>This is my header</h1>
      {!loginUser ? (
        <>
          <button onClick={() => handleOpen("login")}>Login</button>
          <p onClick={() => handleOpen("register")}>register</p>
        </>
      ) : (
        <button onClick={() => handleOpen("UserProfile")}>
          <AiOutlineUser />
        </button>
      )}
      {isRegisterOpen ? (
        <RegisterForm setRegisterIsOpen={setRegisterIsOpen} />
      ) : null}
      {isLoginOpen ? <LoginForm setLoginIsOpen={setLoginIsOpen} /> : null}
      {userProfile ? (
        <UserProfileModule setUserProfile={setUserProfile} />
      ) : null}
    </header>
  );
}

export default Header;
