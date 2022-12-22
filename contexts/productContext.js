import { createContext, useState } from "react";
import productData from "./productData";

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [productDB] = useState(productData);
  const [currentProduct, setCurrentProduct] = useState("");
  const [sellerIndex, setSellerIndex] = useState(0);

  return (
    <ProductContext.Provider
      value={{
        productDB,
        currentProduct,
        setCurrentProduct,
        sellerIndex,
        setSellerIndex,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}