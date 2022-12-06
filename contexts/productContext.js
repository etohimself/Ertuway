import { createContext, useState } from "react";
import productData from "./productData";

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [productDB, setProductDB] = useState(productData);

  return (
    <ProductContext.Provider
      value={{
        productDB,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
