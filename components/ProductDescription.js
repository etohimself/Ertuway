import { useState } from "react";
import styles from "../styles/ProductDescription.module.css";
import ProductDetails from "./ProductDetails";

function ProductDescription(props) {
  const [myPage, setMyPage] = useState(1);

  return (
    <div className={styles.ProductDescriptionLarge}>
      <div className={styles.navBar}>
        <div
          className={`${styles.navButton} ${myPage == 1 && styles.active}`}
          onClick={() => setMyPage(1)}
        >
          Product Details
        </div>
        <div
          className={`${styles.navButton} ${myPage == 2 && styles.active}`}
          onClick={() => setMyPage(2)}
        >
          Reviews and Comments
        </div>
        <div
          className={`${styles.navButton} ${myPage == 3 && styles.active}`}
          onClick={() => setMyPage(3)}
        >
          Terms and Conditions
        </div>
        <div
          className={`${styles.navButton} ${myPage == 4 && styles.active}`}
          onClick={() => setMyPage(4)}
        >
          All Sellers
        </div>
      </div>
      <div className={styles.contentArea}>
        <ProductDetails myPage={myPage} product={props.product} />
      </div>
    </div>
  );
}

export default ProductDescription;
