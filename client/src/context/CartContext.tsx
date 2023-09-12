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
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    console.log(cart);
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
