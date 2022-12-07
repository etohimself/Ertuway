import { useContext } from "react";
import styles from "../styles/ProductShortList.module.css";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "./ProductItem";
import SeeAllButton from "./SeeAllButton";

function ProductShortList(props) {
  const { productDB } = useContext(ProductContext);
  let dumpList = [];
  let itemList = [];

  //Get all items from productDB to dumpList
  productDB.forEach((cat) =>
    cat.products.forEach((item) => {
      dumpList.push(item);
    })
  );

  //Sort the dumpList by views, popularity or sale percentage
  dumpList = dumpList.sort((a, b) => b[props.sortBy] - a[props.sortBy]);

  //Extract the top 1 item from each main category
  for (let i = 0; i < dumpList.length; i++) {
    let exists = 0;
    for (let j = 0; j < itemList.length; j++) {
      if (itemList[j].maincategory == dumpList[i].maincategory) {
        exists = 1;
      }
    }

    if (exists == 0) {
      itemList.push(dumpList[i]);
    }
  }
  
  //Slice to fit screen, this may change.
  itemList = itemList.slice(0, 8);

  return (
    <div className={styles.productShortListContainer}>
      <div className={styles.titleBar}>
        <h1>{props.title}</h1>
        <SeeAllButton />
      </div>
      <div className={styles.itemArea}>
        {itemList.map((x, i) => {
          return <ProductItem id={x.id} key={x.id} />;
        })}
      </div>
    </div>
  );
}

export default ProductShortList;
