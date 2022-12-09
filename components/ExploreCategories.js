import styles from "../styles/ExploreCategories.module.css";
import { useContext, useRef } from "react";
import { ProductContext } from "../contexts/productContext";
import CategoryIcon from "./CategoryIcon";
import useElementWidth from "./hooks/useElementWidth";

function ExploreCategories(props) {
  const { productDB } = useContext(ProductContext);
  const containerRef = useRef(0);
  const [myWidth, childWidth] = useElementWidth(containerRef);

  const maxItemsPerRow = (myWidth - (myWidth % childWidth)) / childWidth;
  const hideAfter = productDB.length - (productDB.length % maxItemsPerRow);

  return (
    <div className={styles.ExploreCategoriesContainer}>
      <h1>Explore Categories</h1>
      <div className={styles.iconList} ref={containerRef}>
        {productDB.map((category, index) => (
          <CategoryIcon
            name={category.shortname}
            index={index + 1}
            hideAfter={hideAfter}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreCategories;
