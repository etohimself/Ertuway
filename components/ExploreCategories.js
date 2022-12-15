import styles from "../styles/ExploreCategories.module.css";
import { useContext, useRef } from "react";
import { ProductContext } from "../contexts/productContext";
import CategoryIcon from "./CategoryIcon";
import useElementWidth from "./hooks/useElementWidth";
import {  useRouter } from "next/router";

function ExploreCategories(props) {
  const { productDB } = useContext(ProductContext);
  const containerRef = useRef(0);
  const [myWidth, childWidth] = useElementWidth(containerRef);
  const router = useRouter();
  const maxItemsPerRow = (myWidth - (myWidth % childWidth)) / childWidth;
  const hideAfter = productDB.length - (productDB.length % maxItemsPerRow);

  function handleSubcategoryClick(maincategory, subcategory) {
    router.push(
      "/" + maincategory + "/" + subcategory.split(maincategory + "_")[1]
    );
  }

  return (
    <div className={styles.ExploreCategoriesContainer}>
      <h1>Explore Categories</h1>
      <div className={styles.iconList} ref={containerRef}>
        {productDB.map((category, index) => (
          <CategoryIcon
            name={category.shortname}
            index={index + 1}
            hideAfter={hideAfter}
            key={category.shortname}
            onClick={() =>
              handleSubcategoryClick(category.maincategory, category.shortname)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreCategories;
