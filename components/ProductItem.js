import styles from "../styles/ProductItem.module.css";
import priceFormat from "../Helpers/priceFormat";
import Percentage from "./icons/Percentage";
import { useRouter } from "next/router";

function ProductItem(props) {
  const router = useRouter();

  let marginStyle = {};

  if (props.noLeftMargin) marginStyle.marginLeft = 0;
  if (props.noRightMargin) marginStyle.marginRight = 0;

  return (
    <div
      className={`${styles.itemContainer} ${props.className}`}
      style={marginStyle}
      onClick={() => router.push("/product/" + props.data.id)}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.productImg}
          src={props.data.imgSmall}
          alt={props.data.name}
        />
        {props.data.salePercentage > 0 && (
          <div className={styles.percentageContainer}>
            <Percentage className={styles.percentageSvg} />
            <div className={styles.percentageOffText}>
              {`%${props.data.salePercentage}`}
              <br />
              OFF
            </div>
          </div>
        )}
      </div>
      <div className={styles.priceLabel}>
        {props.data.salePercentage
          ? `$${priceFormat(
              props.data.price * ((100 - props.data.salePercentage) / 100)
            )}`
          : `$${priceFormat(props.data.price)}`}
      </div>
      {props.data.salePercentage > 0 && (
        <div className={styles.oldPrice}>{`$${priceFormat(
          props.data.price
        )}`}</div>
      )}
      <div className={styles.productName}>
        {props.data.brand} {props.data.name}
      </div>
    </div>
  );
}

export default ProductItem;
