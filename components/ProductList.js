import styles from "../styles/ProductList.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "./ProductItem";
import Dropdown from "./Dropdown";
import useElementWidth from "./hooks/useElementWidth";
import { FilterContext } from "../contexts/filterContext";

function ProductList(props) {
  const {
    updateFilters,
    filter_maincategory,
    filter_subcategory,
    filter_price,
    filter_color,
    filter_rating,
    filter_warranty,
    filter_sortby,
    list_sortby,
    filteredProducts,
    routes_rendered
  } = useContext(FilterContext);
  const containerRef = useRef();
  const [containerWidth, firstChildWidth] = useElementWidth(containerRef);
  const calculatedMargin =
    firstChildWidth > 0 && containerWidth % firstChildWidth;

  //const [filteredProducts, setFilteredProducts] = useState([]);

  /*function filterProductData(product) {
    return (
      product.maincategory == filter_maincategory &&
      (product.subcategory == filter_subcategory ||
        filter_subcategory == "all") &&
      product.price >= filter_price.min &&
      (product.price <= filter_price.max ||
        filter_price.max <= filter_price.min) &&
      (product.availableColors.includes(filter_color.color) ||
        filter_color.color == "all") &&
      ((product.rating <= filter_rating.stars + 1 &&
        product.rating >= filter_rating.stars - 1) ||
        filter_rating.stars == -1) &&
      (product.warranty == filter_warranty.value || filter_warranty.value == 0)
    );
  }

  function sortProductData(a, b) {
    if (filter_sortby.value == 0) {
      //Recommended Order ==  Sort By (Rating * Sold)
      return a.soldCount * a.rating > b.soldCount * b.rating ? -1 : 1;
    } else if (filter_sortby.value == 1) {
      //Sort by Highest to Lowest Price
      return a.price > b.price ? -1 : 1;
    } else if (filter_sortby.value == 2) {
      //Sort by Lowest to Highest Price
      return a.price < b.price ? -1 : 1;
    } else if (filter_sortby.value == 3) {
      //Sort By Most Sold First
      return a.soldCount > b.soldCount ? -1 : 1;
    } else if (filter_sortby.value == 4) {
      //Sort By Most Viewed First
      return a.viewCount > b.viewCount ? -1 : 1;
    }
    return 1;
  }

  useEffect(() => {
    let finalProducts = [];
    productDB.forEach((cat) => {
      cat.products.forEach((item) => {
        filterProductData(item) && finalProducts.push(item);
      });
    });
    finalProducts = finalProducts.sort((a, b) => sortProductData(a, b));
    setFilteredProducts(finalProducts);
  }, [
    filter_maincategory,
    filter_subcategory,
    filter_price,
    filter_color,
    filter_rating,
    filter_warranty,
    filter_sortby,
  ]);

  */

  //Test Logging
  useEffect(() => {
    console.log({
      filter_maincategory,
      filter_subcategory,
      filter_price,
      filter_color,
      filter_rating,
      filter_warranty,
      filter_sortby,
      list_sortby,
    });
  }, []);

  if (routes_rendered) {
    return (
      <div className={styles.ProductListWrapper}>
        <Dropdown
          slicername="order_slicer"
          list={list_sortby}
          value={filter_sortby}
          onSelect={updateFilters}
          className={styles.sortSlicer}
          style={{ marginRight: calculatedMargin }}
        />
        <div className={styles.ProductListContainer} ref={containerRef}>
          {filteredProducts.map((x) => (
            <ProductItem id={x.id} key={x.id} />
          ))}
        </div>
      </div>
    );
  } else {
    {
      return (
        <div className={styles.ProductListWrapper}>
          <div
            className={`${styles.lazyPlaceHolder} ${styles.titleSkeleton}`}
          />
          <div className={styles.ProductListContainer} ref={containerRef}>
            {Array(50)
              .fill(null)
              .map((x, i) => (
                <div className={styles.lazyPlaceHolder} key={i} />
              ))}
          </div>
        </div>
      );
    }
  }
}

export default ProductList;
