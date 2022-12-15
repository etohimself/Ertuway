import styles from "../styles/DiscountCategories.module.css";
import HorizontalContainer from "../components/HorizontalContainer.js";
import SaleCategory from "../components/SaleCategory.js";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import {  useRouter } from "next/router";

function DiscountCategories(props) {
  const router = useRouter();
  const { productDB } = useContext(ProductContext);

  //Filter the categories that have at least one product on sale for the current event
  let categoriesWithSale = [];

  for (let i = 0; i < productDB.length; i++) {
    //Scan all categories
    let maxSale = 0;
    for (let j = 0; j < productDB[i].products.length; j++) {
      //Scan all products within the categories
      if (
        productDB[i].products[j].salePercentage > 0 &&
        productDB[i].products[j].saleReason == props.event
      ) {
        if (maxSale < productDB[i].products[j].salePercentage) {
          maxSale = productDB[i].products[j].salePercentage;
        }
      }
    }
    if (maxSale > 0) {
      //If the category has a sale matching..
      categoriesWithSale.push({ ...productDB[i], maxSale });
    }
  }

  function handleSubcategoryClick(maincategory, subcategory) {
    router.push(
      "/" + maincategory + "/" + subcategory.split(maincategory + "_")[1]
    );
  }

  return (
    <div className={styles.discountCategoryContainer}>
      <div className={styles.titleBar}>
        <h1 className={styles.discountCategoryTitle}>{props.title}</h1>
      </div>
      <HorizontalContainer>
        {categoriesWithSale.map((x, i) => {
          return (
            <SaleCategory
              title={x.categoryName}
              image={x.categoryImg}
              discount={x.maxSale}
              key={i + "_" + x.shortname}
              onClick={() => handleSubcategoryClick(x.maincategory, x.shortname)}
            />
          );
        })}
      </HorizontalContainer>
    </div>
  );
}

export default DiscountCategories;
