import styles from "../styles/ProductItem.module.css";
import priceFormat from "../Helpers/priceFormat";
import Image from "next/image";
import Percentage from "./icons/Percentage";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import { useRouter } from "next/router";

function ProductItem(props) {
  const { productDB } = useContext(ProductContext);
  const router = useRouter();

  let marginStyle = {};
  let myData = {};

  for (let i = 0; i < productDB.length; i++) {
    for (let j = 0; j < productDB[i].products.length; j++) {
      if (productDB[i].products[j].id == props.id) {
        myData = { ...productDB[i].products[j] };
      }
    }
  }

  if (props.noLeftMargin) marginStyle.marginLeft = 0;
  if (props.noRightMargin) marginStyle.marginRight = 0;

  return (
    <div
      className={styles.itemContainer}
      style={marginStyle}
      onClick={() => router.push("/product/" + myData.id)}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.productImg}
          src={myData.imgSmall}
          width={160}
          height={160}
          alt={myData.name}
        />
        {myData.salePercentage > 0 && (
          <div className={styles.percentageContainer}>
            <Percentage className={styles.percentageSvg} />
            <div className={styles.percentageOffText}>
              {`%${myData.salePercentage}`}
              <br />
              OFF
            </div>
          </div>
        )}
      </div>
      <div className={styles.priceLabel}>
        {myData.salePercentage
          ? `$${priceFormat(
              myData.price * ((100 - myData.salePercentage) / 100)
            )}`
          : `$${priceFormat(myData.price)}`}
      </div>
      {myData.salePercentage > 0 && (
        <div className={styles.oldPrice}>{`$${priceFormat(myData.price)}`}</div>
      )}
      <div className={styles.productName}>
        {myData.brand} {myData.name}
      </div>
    </div>
  );
}

export default ProductItem;
