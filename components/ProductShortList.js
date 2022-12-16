import { useContext } from "react";
import styles from "../styles/ProductShortList.module.css";
import { ProductContext } from "../contexts/productContext";
import ProductItem from "./ProductItem";
import SeeAllButton from "./SeeAllButton";
import { useRouter } from "next/router";

function ProductShortList(props) {
  const router = useRouter();
  const { productDB } = useContext(ProductContext);
  let dumpList = [];
  let itemList = [];
  let redirectRoute = "/";

  //Get all items from productDB to dumpList
  productDB.forEach((cat) =>
    cat.products.forEach((item) => {
      (!props.maincategory || props.maincategory == item.maincategory) &&
        (!props.subcategory || props.subcategory == item.subcategory) &&
        dumpList.push(item);
    })
  );

  //Sort the dumpList by views, popularity or sale percentage
  dumpList = dumpList.sort((a, b) => b[props.sortBy] - a[props.sortBy]);

  if (!props.subcategory && !props.maincategory) {
    //If there are no category filters in props, extract the top 1 item from each main category
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
    itemList = itemList.slice(0, 8);
  } else {
    //Otherwise get the first 8 items, its already filtered
    itemList = dumpList.slice(0, 8);
  }

  //Build the redirect route
  if (props.maincategory)
    redirectRoute = redirectRoute + props.maincategory + "/";
  if (props.subcategory)
    redirectRoute = redirectRoute + props.subcategory + "/";
  if (props.sortBy == "viewCount") redirectRoute = redirectRoute + "mostviewed";
  if (props.sortBy == "soldCount")
    redirectRoute = redirectRoute + "bestsellers";
  if (props.sortBy == "salePercentage")
    redirectRoute = redirectRoute + "bestdeals";

  return (
    <div className={styles.productShortListContainer}>
      <div className={styles.titleBar}>
        <h1>{props.title}</h1>
        <SeeAllButton onClick={() => router.push(redirectRoute)} />
      </div>
      <div className={styles.itemArea}>
        {itemList.map((x, i) => {
          return (
            <ProductItem
              id={x.id}
              key={x.id}
              noLeftMargin={i == 0}
              noRightMargin={i == itemList.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductShortList;
