import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import styles from "../styles/TestList.module.css";
import ProductItem from "./ProductItem";

function TestList(props) {
  const { productDB } = useContext(ProductContext);
  const [productList, setProductList] = useState();

  useEffect(() => {
    let productTemp = [];
    for (let i = 0; i < productDB.length; i++) {
      for (let j = 0; j < productDB[i].products.length; j++) {
        productTemp.push(productDB[i].products[j].id);
      }
    }
    productTemp = productTemp.sort((a, b) => 0.5 - Math.random());
    setProductList([...productTemp]);
  }, []);

  return (
    <div className={styles.TestListContainer}>
      {(productList) && productList.map((x) => (
        <ProductItem id={x} key={x} />
      ))}
    </div>
  );
}

export default TestList;
