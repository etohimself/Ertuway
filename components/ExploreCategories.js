import styles from "../styles/ExploreCategories.module.css";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import CategoryIcon from "./CategoryIcon";

function ExploreCategories(props) {
  const { productDB } = useContext(ProductContext);

  return (
    <div className={styles.ExploreCategoriesContainer}>
      <h1>Explore Categories</h1>
      <div className={styles.iconList}>
        {productDB.map((category) => (
          <CategoryIcon name={category.shortname} />
        ))}
      </div>
    </div>
  );
}

export default ExploreCategories;
