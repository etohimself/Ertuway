import { useContext } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";

function CategoryPage(props) {
  return (
    <div className={styles.CategoryPageContainer}>
      <div className={styles.SlicerArea}>
        <Slicers page={props.page} />
      </div>
      <div className={styles.ProductArea}>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export default CategoryPage;
