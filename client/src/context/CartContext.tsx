import {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";
import { IProduct } from "./ProductContext";
export interface ICart {
  products: IProduct[];
  quantity: number;
}

interface ICartContext {
  cart: ICart[];
  addProductToCart: (product: object) => void;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  addProductToCart: (product) => Promise.resolve(),
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICart[]>([]);

  const addProductToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart.length === 0) {
        return [product];
      } else {
        return [...prevCart, product];
      }
    });
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, addProductToCart }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
