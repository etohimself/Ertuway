import { useContext, useEffect } from "react";
import styles from "../styles/ProductPage.module.css";
import { ProductContext } from "../contexts/productContext";
import Image from "next/image";
import StarRating from "../components/StarRating";
import priceFormat from "../helpers/priceFormat";

function ProductPage(props) {
  const { currentProduct } = useContext(ProductContext);

  if (currentProduct.imgLarge) {
    return (
      <div className={styles.ProductPageContainer}>
        <div className={styles.ProductWelcomer}>
          <div className={styles.mobileTitleArea}>
            <div className={styles.ProductTitle}>
              {currentProduct.brand} {currentProduct.name}
            </div>
            <div className={styles.ratingAndReviewContainer}>
              <StarRating rating={currentProduct.rating} />
              {`${Math.floor(currentProduct.soldCount * 0.25)}`} Reviews
            </div>
          </div>
          <Image
            className={styles.ProductImageContainer}
            width={578}
            height={608}
            src={currentProduct.imgLarge}
          />
          <div className={styles.ProductInfoContainer}>
            <div className={styles.largeTitleArea}>
              <div className={styles.ProductTitle}>
                {currentProduct.brand} {currentProduct.name}
              </div>
              <div className={styles.ratingAndReviewContainer}>
                <StarRating rating={currentProduct.rating} />
                {`${Math.floor(currentProduct.soldCount * 0.25)}`} Reviews
              </div>
            </div>
            <div className={styles.sellerNameContainer}>
              Seller : <span>{currentProduct.brand}</span>
            </div>
            <div className={styles.priceLabel}>
              $ {priceFormat(currentProduct.price)}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <h1>Loading...</h1>;
  }
}

export default ProductPage;
