import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import styles from "../styles/Slicers.module.css";
import ListSlicer from "./ListSlicer";

function Slicers(props) {
  const { productDB } = useContext(ProductContext);

  const handleSelection = (item) => {
    alert(item.name);
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
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
      <ListSlicer
        title="Warranty"
        list={[{name:"2 Years Warranty"}, {name:"1 Year of Warranty"}, {name:"No Warranty"}]}
        onSelect={handleSelection}
        className={styles.slicerItem}
      />
    </>
  );
}

export default Slicers;
