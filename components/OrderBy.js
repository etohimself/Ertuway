import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import styles from "../styles/Slicers.module.css";
import RadioSlicer from "./RadioSlicer";

function OrderBy(props) {
  const handleSelection = (payload) => {
    console.log(
      `Slicer data arrived from ${payload.invoker}, type: ${payload.type} data : `
    );
    console.log(payload.data);
  };

  return (
    <>
      <RadioSlicer
        title="Order Products"
        list={[
          { name: "Recommended Order", warranty: 1 },
          { name: "Most Sold", warranty: 2 },
          { name: "1 Year of Warranty", warranty: 1 },
          { name: "No Warranty", warranty: 0 },
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
