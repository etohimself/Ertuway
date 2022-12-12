import styles from "../styles/ProductList.module.css";
import { useContext, useRef, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "./ProductItem";
import Dropdown from "./Dropdown";
import useElementWidth from "./hooks/useElementWidth";

function ProductList(props) {
  const { productDB } = useContext(ProductContext);
  const containerRef = useRef();
  const [containerWidth, firstChildWidth] = useElementWidth(containerRef);
  const calculatedMargin = containerWidth % firstChildWidth;
  const [sortBySelection, setSortBySelection] = useState(0);

  const handleSortSelection = (selectedIndex) => {
    setSortBySelection(selectedIndex);
    props.onSort({
      invoker: "order_slicer",
      type: 1,
      data: { order: selectedIndex },
    });
  };

  function filterProductData(product) {
    return (
      product.maincategory == props.maincategory &&
      product.price >= props.minPrice &&
      (product.price <= props.maxPrice || props.maxPrice <= props.minPrice) &&
      (product.availableColors.includes(props.color) || props.color == "all") &&
      product.rating >= props.minRating &&
      product.rating <= props.maxRating &&
      (product.warranty == props.warranty || props.warranty == "all")
    );
  }

  function sortProductData(a, b) {
    if (props.orderBy == 0) {
      //Recommended Order ==  Sort By (Rating * Sold)
      return a.soldCount * a.rating > b.soldCount * b.rating ? -1 : 1;
    } else if (props.orderBy == 1) {
      //Sort by Highest to Lowest Price
      return a.price > b.price ? -1 : 1;
    } else if (props.orderBy == 2) {
      //Sort by Lowest to Highest Price
      return a.price < b.price ? -1 : 1;
    } else if (props.orderBy == 3) {
      //Sort By Most Sold Fİrst
      return a.soldCount > b.soldCount ? -1 : 1;
    } else if (props.orderBy == 4) {
      //Sort By Most Viewed First
      return a.viewCount > b.viewCount ? -1 : 1;
    }
    return 1;
  }

  var finalProducts = [];
  productDB.forEach((cat) => {
    cat.products.forEach((item) => {
      filterProductData(item) && finalProducts.push(item);
    });
  });

  finalProducts = finalProducts.sort((a, b) => sortProductData(a, b));

  return (
    <div className={styles.ProductListWrapper}>
      <Dropdown
        list={[
          "Recommended Order",
          "Highest to Lowest Price",
          "Lowest to Highest Price",
          "Most Sold Products",
          "Most Viewed Products",
        ]}
        selected={sortBySelection}
        className={styles.sortSlicer}
        style={{ marginRight: calculatedMargin }}
        onSelect={handleSortSelection}
      />
      <div className={styles.ProductListContainer} ref={containerRef}>
        {finalProducts.map((x) => (
          <ProductItem id={x.id} key={x.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
