import { useState, useRef, useEffect } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import useElementWidth from "./hooks/useElementWidth";
import ProductList from "./ProductList.js";

function CategoryPage(props) {
  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [color, setColor] = useState("all");
  const [warranty, setWarranty] = useState("all");
  const [orderBy, setOrderBy] = useState(0);

  const handleSlicerChange = (payload) => {
    if (payload.invoker == "category_slicer") {
      //Redirect to that category here..
    } else if (payload.invoker == "price_slicer") {
      setMinPrice(payload.data.min);
      setMaxPrice(
        payload.data.max >= payload.data.min ? payload.data.max : 99999
      );
    } else if (payload.invoker == "rating_slicer") {
      setMinRating(payload.data.stars > 0 ? payload.data.stars - 1 : 0);
      setMaxRating(payload.data.stars > 0 ? payload.data.stars : 5);
    } else if (payload.invoker == "color_slicer") {
      setColor(payload.data.color);
    } else if (payload.invoker == "warranty_slicer") {
      setWarranty(payload.data.warranty);
    } else if (payload.invoker == "order_slicer") {
      setOrderBy(payload.data.order);
    }
  };

  const handleLeftButton = () => {
    setShowFilters(1);
  };

  const handleRightButton = () => {
    if (showFilters || showOrders) {
      //Something already shown, therefore this serves as Cancel button
      setShowFilters(0);
      setShowOrders(0);
    } else {
      setShowOrders(1);
    }
  };

  useEffect(() => {
    //In case the user resizes window, hide filters and order
    if (showOrders || showFilters) {
      handleRightButton();
    }
  }, [myWidth]);

  return (
    <div className={styles.CategoryPageContainer} ref={containerRef}>
      <div
        className={`${styles.innerContainer} ${
          showFilters && styles.showFilters
        } ${showOrders && styles.showOrders}`}
      >
        <div className={styles.SlicerArea}>
          <Slicers page={props.page} onChange={handleSlicerChange} />
        </div>
        <div className={styles.ProductArea}>
          <div
            className={`${styles.MobileTopBar} 
            ${showFilters && styles.showFilter}
            ${showOrders && styles.showOrder}
            }`}
          >
            {!showFilters && !showOrders && (
              <div
                className={styles.ShowFiltersButton}
                onClick={handleLeftButton}
              >
                <FilterIcon className={styles.topBarIcon} />
                <span class={styles.topbarButtonText}>Show Filters</span>
              </div>
            )}

            <div
              className={styles.ShowOrdersButton}
              onClick={handleRightButton}
            >
              {showFilters || showOrders ? (
                <>
                  <CancelIcon className={styles.topBarIcon} />
                  <span class={styles.topbarButtonText}>Close</span>
                </>
              ) : (
                <>
                  <SortIcon className={styles.topBarIcon} />
                  <span class={styles.topbarButtonText}>Sort Products</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.productInner}>
            <h1>{props.title}</h1>
            <ProductList
              maincategory={props.page}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minRating={minRating}
              maxRating={maxRating}
              color={color}
              warranty={warranty}
              orderBy={orderBy}
            />
          </div>
        </div>
        <div className={styles.OrderArea}>
          <OrderBy onChange={handleSlicerChange} />
        </div>

        <div
          className={`${styles.screenOverlay} ${
            (showFilters || showOrders) && styles.show
          }`}
          onClick={handleRightButton}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
