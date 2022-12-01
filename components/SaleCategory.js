import styles from "../styles/SaleCategory.module.css";
import Image from "next/image";
import appliances from "../public/images/electronics_appliences_large.png";
import SaleIcon from "./Icons/SaleIcon";

function SaleCategory(props) {
  return (
    <div className={styles.SaleCategoryContainer}>
      <Image src={appliances} className={styles.SaleCategoryImage} />
      <div className={styles.SaleCategoryInfo}>
        <h1>Home Appliances</h1>
        <div className={styles.salePercentage}>
          <SaleIcon className={styles.salePercentageIcon} />
          <div className={styles.salePercentageText}>Up to 25% Discount*</div>
        </div>
      </div>
    </div>
  );
}

export default SaleCategory;
