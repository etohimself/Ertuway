import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import styles from "../styles/Slicers.module.css";
import ColorSlicer from "./ColorSlicer";
import ListSlicer from "./ListSlicer";
import PriceSlicer from "./PriceSlicer";
import RatingSlicer from "./RatingSlicer";
import RadioSlicer from "./RadioSlicer";

function Slicers(props) {
  const { productDB } = useContext(ProductContext);

  /*Expected payload :
  {
    invoker:"category_slicer",  so we know which slicer sends the data
    type:1,  because some slicers can send multiple types of data
    data:{...selected item}}  the actual selected item by the user
  */

  const handleSelection = (payload) => {
    props.onChange(payload);
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
      <PriceSlicer
        title="Price"
        list={[
          { min: 0, max: 5 },
          { min: 5, max: 20 },
          { min: 20, max: 50 },
          { min: 50, max: 100 },
          { min: 100, max: 250 },
          { min: 250, max: 500 },
          { min: 500, max: 1000 },
          { min: 1000, max: 0 },
        ]}
        allowEmpty={1}
        onSelect={handleSelection}
        slicername="price_slicer"
        className={styles.slicerItem}
      />
      <ColorSlicer
        title="Color"
        slicername="color_slicer"
        className={styles.slicerItem}
        onSelect={handleSelection}
        allowEmpty={1}
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
      <RatingSlicer
        title="Rating"
        list={[
          { name: "5 Stars Reviews", stars: 5 },
          { name: "4 Stars Reviews", stars: 4 },
          { name: "3 Stars Reviews", stars: 3 },
          { name: "2 Stars Reviews", stars: 2 },
          { name: "1 Star Reviews", stars: 1 },
        ]}
        allowEmpty={1}
        slicername="rating_slicer"
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
      <RadioSlicer
        title="Warranty"
        list={[
          { name: "All Warranty", warranty: "all" },
          { name: "2 Years Warranty", warranty: 2 },
          { name: "1 Year of Warranty", warranty: 1 },
        ]}
        allowEmpty={0}
        slicername="warranty_slicer"
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
    </>
  );
}

export default Slicers;
