import styles from "../styles/ProductItem.module.css";
import priceFormat from "../Helpers/priceFormat";
import Image from "next/image";

function ProductItem(props) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <Image className={styles.productImg} src={props.image} />
        <div className={styles.percentageContainer}>
          {props.showPercentage && `%30 OFF`}
        </div>
      </div>
      <div className={styles.priceLabel}>
        {props.price && `$${priceFormat(props.price)}`}
      </div>
      <div className={styles.oldPrice}>
        {props.oldPrice && `$${priceFormat(props.oldPrice)}`}
      </div>
      <div className={styles.productName}>{props.productName}</div>
    </div>
  );
}

export default ProductItem;
