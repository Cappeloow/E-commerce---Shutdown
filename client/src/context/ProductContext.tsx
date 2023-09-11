import {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";

export interface IProduct {
  _id: number;
  title: string;
  image: string;
  price: number;
}

interface IProductContext {
  products: IProduct[];
  fetchProducts: () => void;
}

const ProductContext = createContext<IProductContext>({
  products: [],
  fetchProducts: () => Promise.resolve(),
});

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  async function fetchProducts() {
    console.log("we are here");
    try {
      const response = await fetch("/api/products/getAllProducts");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductContext.Provider value={{ products, fetchProducts }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;
