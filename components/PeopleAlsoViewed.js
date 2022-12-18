import { useContext, useEffect, useState, useRef } from "react";
import styles from "../styles/PeopleAlsoViewed.module.css";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "../components/ProductItem";
import useElementWidth from "../components/hooks/useElementWidth";
import shuffleArr from "../helpers/shuffle.js";

function PeopleAlsoViewed(props) {
  const { productDB } = useContext(ProductContext);
  const [productList, setProductList] = useState([]);
  const containerRef = useRef();
  const [myWidth, childWidth] = useElementWidth(containerRef);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (myWidth > 0 && myWidth >= childWidth) {
      //First dummy product rendered, we can use its width for reference
      setItemCount(((myWidth - (myWidth % childWidth)) / childWidth) * 2);
    }
  }, [myWidth, childWidth]);

  useEffect(() => {
    let dummyList = [];
    productDB.forEach((cat) => {
      if (cat.shortname == props.subcategory) {
        dummyList = shuffleArr([...cat.products]).slice(0, 12);
      }
    });
    setProductList([...dummyList]);
  }, [productDB, props.subcategory]);

  return (
    <div className={styles.peopleViewedContainer}>
      <div className={styles.titleBar}>People Also Viewed :</div>
      <div className={styles.productList} ref={containerRef}>
        {productList.map((item, index) => {
          return (
            <ProductItem
              id={item.id}
              key={item.id}
              className={`${
                index >= (myWidth - (myWidth % childWidth)) / childWidth &&
                styles.noDraw
              }`}
            />
          );
        })}
        <ProductItem
          id={productDB[0].products[0].id}
          className={`${styles.dummyProduct} ${myWidth > 0 && styles.noDraw}`}
        />
      </div>
    </div>
  );
}

export default PeopleAlsoViewed;
