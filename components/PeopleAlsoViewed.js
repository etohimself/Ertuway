import { useEffect, useState, useRef } from "react";
import styles from "../styles/PeopleAlsoViewed.module.css";
import ProductItem from "../components/ProductItem";
import useElementWidth from "../components/hooks/useElementWidth";

function PeopleAlsoViewed(props) {
  const [productList, setProductList] = useState([]);
  const [dataFetched, setDataFetched] = useState(0);
  const containerRef = useRef(0);
  const [parentWidth, childWidth] = useElementWidth(containerRef);
  const [hideAfter, setHideAfter] = useState(12);

  //WHEN COMPONENT IS RENDERED
  useEffect(() => {
    setDataFetched(0);
    setProductList([]);

    //Fetch products and subcategories
    const fetchData = async () => {
      let productAPI = `${location.protocol}//${location.hostname}:27469/products?similiarCategory=${props.subcategory}`;
      let res_product = await fetch(productAPI);
      let data_product = await res_product.json();

      //Check if the data we received is valid
      if (data_product.length && data_product[0].imgLarge) {
        //If data is valid, set product list
        setProductList(data_product);
        setDataFetched(1);
      }
    };
    fetchData();
  }, [props.subcategory]);

  useEffect(() => {
    //When the width changes, quickly calculate which ones to hide
    if (!childWidth) {
      setHideAfter(12);
      return;
    }
    setHideAfter(((parentWidth - (parentWidth % childWidth)) / childWidth) * 2);
  }, [parentWidth, childWidth]);

  if (dataFetched && productList.length)
    return (
      <div className={styles.peopleViewedContainer}>
        <div className={styles.titleBar}>People Also Viewed :</div>
        <div className={styles.productList} ref={containerRef}>
          {productList.map((item, index) => {
            return (
              <ProductItem
                data={item}
                key={item.id}
                className={`${index >= hideAfter && styles.noDraw}`}
              />
            );
          })}
        </div>
      </div>
    );
}

export default PeopleAlsoViewed;
