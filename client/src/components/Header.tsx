import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useUserContext } from "../context/UserContext";
import UserProfileModule from "./UserProfileModule";
import { useCartContext } from "../context/CartContext";
function Header({}: Props) {
  const { cart } = useCartContext();
  const navigate = useNavigate();
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

  function navigateToCart() {
    console.log(cart);
    if (cart.length >= 1) {
      navigate("/cart");
    }
  }

  const totalQuantityInCart = () => {
    const totalQuant = cart.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuant.toString();
  };

  return (
    <header>
      <div className="Title">
        <h1>Icon</h1>
      </div>

      <div className="Nav">
        <p>
          <AiOutlineShoppingCart onClick={navigateToCart} />
        </p>
        <p>{cart.length >= 1 ? <p>{totalQuantityInCart()}</p> : null}</p>
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
      </div>
    </header>
  );
}

export default Header;
