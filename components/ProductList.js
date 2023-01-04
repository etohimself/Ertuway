import styles from "../styles/ProductList.module.css";
import { useContext, useRef } from "react";
import ProductItem from "./ProductItem";
import Dropdown from "./Dropdown";
import useElementWidth from "./hooks/useElementWidth";
import { FilterContext } from "../contexts/filterContext";

function ProductList(props) {
  const { updateFilters, filter_sortby, list_sortby, filteredProducts } =
    useContext(FilterContext);
  const containerRef = useRef();
  const [containerWidth, firstChildWidth] = useElementWidth(containerRef);
  const calculatedMargin =
    firstChildWidth > 0 && containerWidth % firstChildWidth;

  if (!props.skeleton) {
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
          {props.list.map((x) => (
            <ProductItem data={x} key={x.id} />
          ))}
        </div>
      </div>
    );
  } else {
    {
      return (
        <div className={styles.ProductListWrapper}>
          <div className={`${styles.titleSkeleton}`} />
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
