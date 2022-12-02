import styles from "../styles/SaleCategory.module.css";
import Image from "next/image";
import subcategory_library from "./SubcategoryImages";
import SaleIcon from "./Icons/SaleIcon";

function SaleCategory(props) {
  const findCategory = subcategory_library.filter(
    (x) => x.name == props.subcategory
  )[0];

  return (
    <div className={styles.SaleCategoryContainer}>
      <Image
        src={
          findCategory ? findCategory.src : "/images/subcategories/default.jpg"
        }
        width={600}
        height={400}
        alt=""
        className={styles.SaleCategoryImage}
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
