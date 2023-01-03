import styles from "../styles/SaleCategory.module.css";
import Image from "next/image";
import SaleIcon from "./Icons/SaleIcon";

function SaleCategory(props) {
  return (
    <div className={styles.SaleCategoryContainer}>
      <Image
        src={props.image}
        width={600}
        height={400}
        alt={props.image}
        className={styles.SaleCategoryImage}
        onClick={props.onClick}
      />
      <div className={styles.SaleCategoryInfo}>
        <h1>{props.title}</h1>
        {props.discount && (
          <div className={styles.salePercentage}>
            <SaleIcon className={styles.salePercentageIcon} />
            <div className={styles.salePercentageText}>
              Up to {props.discount}% Discount*
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleCategory;
