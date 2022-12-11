import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import styles from "../styles/Slicers.module.css";
import ColorSlicer from "./ColorSlicer";
import ListSlicer from "./ListSlicer";
import PriceSlicer from "./PriceSlicer";

function Slicers(props) {
  const { productDB } = useContext(ProductContext);

  /*Expected payload :
  {
    invoker:"category_slicer",  so we know which slicer sends the data
    type:1,  because some slicers can send multiple types of data
    data:{...selected item}}  the actual selected item by the user
  */

  const handleSelection = (payload) => {
    console.log(
      `Slicer data arrived from ${payload.invoker}, type: ${payload.type} data : `
    );
    console.log(payload.data);
  };

  const listOfCategories = productDB
    .filter((x) => x.maincategory == props.page)
    .reduce(
      (acc, cat) => [
        ...acc,
        { name: cat.categoryName, shortname: cat.shortname },
      ],
      []
    );

  return (
    <>
      <ListSlicer
        title="Categories"
        list={listOfCategories}
        slicername="category_slicer"
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
      <ListSlicer
        title="Warranty"
        list={[
          { name: "2 Years Warranty" },
          { name: "1 Year of Warranty" },
          { name: "No Warranty" },
        ]}
        slicername="warranty_slicer"
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
      <PriceSlicer
        title="Price"
        list={[
          { min: 0, max: 10 },
          { min: 10, max: 100 },
          { min: 100, max: 1000 },
          { min: 1000, max: 0 },
        ]}
        onSelect={handleSelection}
        slicername="price_slicer"
        className={styles.slicerItem}
      />
      <ColorSlicer
        title="Color"
        slicername="color_slicer"
        className={styles.slicerItem}
        onSelect={handleSelection}
        list={[
          { color: "white" },
          { color: "black" },
          { color: "gray" },
          { color: "silver" },
          { color: "gold" },
          { color: "red" },
          { color: "orange" },
          { color: "yellow" },
          { color: "green" },
          { color: "cyan" },
          { color: "blue" },
          { color: "purple" },
          { color: "violet" },
          { color: "pink" },
          { color: "rainbow" },
        ]}
        list={[
          { color: "white" },
          { color: "black" },
          { color: "gray" },
          { color: "silver" },
          { color: "gold" },
          { color: "red" },
          { color: "orange" },
          { color: "yellow" },
          { color: "green" },
          { color: "cyan" },
          { color: "blue" },
          { color: "purple" },
          { color: "violet" },
          { color: "pink" },
          { color: "rainbow" },
        ]}
      />
    </>
  );
}

export default Slicers;
