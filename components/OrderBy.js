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
          { name: "Recommended Order", order: 0},
          { name: "Highest to Lowest Price", order: 1 },
          { name: "Lowest to Highest Price", order: 2 },
          { name: "Most Sold Products", order: 3 },
          { name: "Most Viewed Products", order: 4 },
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
