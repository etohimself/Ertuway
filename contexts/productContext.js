import { createContext, useState } from "react";
import productData from "./productData";

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [productDB] = useState(productData);
  const [currentProduct, setCurrentProduct] = useState("");

  return (
    <ProductContext.Provider
      value={{
        productDB,
        currentProduct,
        setCurrentProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
