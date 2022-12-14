import { useContext } from "react";
import { FilterContext } from "../contexts/filterContext";
import styles from "../styles/Slicers.module.css";
import ListSlicer from "./ListSlicer";
import ColorSlicer from "./ColorSlicer";
import PriceSlicer from "./PriceSlicer";
import RatingSlicer from "./RatingSlicer";
import RadioSlicer from "./RadioSlicer";

function Slicers(props) {
  const {
    updateFilters,
    filter_maincategory,
    filter_subcategory,
    filter_color,
    filter_price,
    filter_rating,
    filter_warranty,
    list_subcategory,
    list_color,
    list_price,
    list_rating,
    list_warranty,
  } = useContext(FilterContext);

  if (filter_maincategory && filter_maincategory != "all") {
    return (
      <>
        <ListSlicer
          title="Categories"
          list={list_subcategory}
          value={filter_subcategory}
          slicername="category_slicer"
          onSelect={updateFilters}
          className={styles.slicerItem}
        />
        <PriceSlicer
          title="Price"
          list={list_price}
          value={filter_price}
          onSelect={updateFilters}
          slicername="price_slicer"
          className={styles.slicerItem}
        />
        <ColorSlicer
          title="Color"
          slicername="color_slicer"
          className={styles.slicerItem}
          onSelect={updateFilters}
          value={filter_color}
          list={list_color}
        />
        <RatingSlicer
          title="Rating"
          list={list_rating}
          value={filter_rating}
          slicername="rating_slicer"
          onSelect={updateFilters}
          className={styles.slicerItem}
        />
        <RadioSlicer
          title="Warranty"
          list={list_warranty}
          value={filter_warranty}
          slicername="warranty_slicer"
          onSelect={updateFilters}
          className={styles.slicerItem}
        />
      </>
    );
  } else {
    return (
      <>
        <div className={styles.lazyPlaceHolder} />
        <div className={styles.lazyPlaceHolder} />
        <div className={styles.lazyPlaceHolder} />
        <div className={styles.lazyPlaceHolder} />
        <div className={styles.lazyPlaceHolder} />
      </>
    );
  }
}

export default Slicers;
