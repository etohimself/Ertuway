import styles from "../styles/Slicers.module.css";
import RadioSlicer from "./RadioSlicer";

function OrderBy(props) {
  return (
    <>
      <RadioSlicer
        title="Order Products"
        list={props.list}
        value={props.value}
        onSelect={props.onSelect}
        noCollapse={1}
        slicername="order_slicer"
        className={styles.slicerItem}
      />
    </>
  );
}

export default OrderBy;
