import styles from "../styles/DiscountCategories.module.css";
import HorizontalContainer from "../components/HorizontalContainer.js";
import SaleCategory from "../components/SaleCategory.js";

function DiscountCategories(props) {
  return (
    <div className={styles.discountCategoryContainer}>
      <h1 className={styles.discountCategoryTitle}>{props.title}</h1>
      <HorizontalContainer>
        {props.list &&
          props.list.map((x, i) => {
            return (
              <SaleCategory
                title={x.title}
                subcategory={x.subcategory}
                discount={x.discount}
                key={i + "_" + x.subcategory}
              />
            );
          })}
      </HorizontalContainer>
    </div>
  );
}

export default DiscountCategories;
