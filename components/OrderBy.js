import styles from "../styles/Slicers.module.css";
import RadioSlicer from "./RadioSlicer";

function OrderBy(props) {
  const handleSelection = (payload) => {
    props.onChange(payload);
  };

  return (
    <>
      <RadioSlicer
        title="Order Products"
        list={[
          { name: "Recommended Order", order: "recommended" },
          { name: "Highest to Lowest Price", order: "highest_price" },
          { name: "Lowest to Highest Price", order: "lowest_price" },
          { name: "Most Sold Products", order: "most_sold" },
          { name: "Most Viewed Products", order: "most_viewed" },
        ]}
        allowEmpty={0}
        noCollapse={1}
        slicername="order_slicer"
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
    </>
  );
}

export default OrderBy;
