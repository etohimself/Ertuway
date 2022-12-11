import styles from "../styles/ProductList.module.css";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "./ProductItem";

function ProductList(props) {
  const { productDB } = useContext(ProductContext);

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
    } else if (props.orderBy == 1) {   //Sort by Highest to Lowest Price
      return a.price > b.price ? -1 : 1;
    } else if (props.orderBy == 2) { //Sort by Lowest to Highest Price
      return a.price < b.price ? -1 : 1;
    } else if (props.orderBy == 3) { //Sort By Most Sold Fİrst
      return a.soldCount > b.soldCount ? -1 : 1;
    } else if (props.orderBy == 4) { //Sort By Most Viewed First
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
    <div className={styles.ProductListContainer}>
      {finalProducts.map((x) => (
        <ProductItem id={x.id} key={x.id} />
      ))}
    </div>
  );
}

export default ProductList;
