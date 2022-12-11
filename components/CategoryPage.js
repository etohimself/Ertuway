import { useState, useRef, useEffect } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import ConfirmIcon from "./Icons/ConfirmIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import useElementWidth from "./hooks/useElementWidth";

function CategoryPage(props) {
  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);
  const handleLeftButton = () => {
    if (showFilters || showOrders) {
      //Something already shown, therefore this serves as Apply button
      //Filter the products here
      setShowFilters(0);
      setShowOrders(0);
    } else {
      setShowFilters(1);
    }
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
        <div
          className={`${styles.screenOverlay} ${
            (showFilters || showOrders) && styles.show
          }`}
          onClick={handleRightButton}
        />

        <div className={styles.SlicerArea}>
          <Slicers page={props.page} />
        </div>
        <div className={styles.ProductArea}>
          <div
            className={`${styles.MobileTopBar} 
            ${showFilters && styles.showFilter}
            ${showOrders && styles.showOrder}
            }`}
          >
            <div
              className={styles.ShowFiltersButton}
              onClick={handleLeftButton}
            >
              {showFilters || showOrders ? (
                <>
                  <ConfirmIcon className={styles.topBarIcon} />
                  Apply
                </>
              ) : (
                <>
                  <FilterIcon className={styles.topBarIcon} />
                  Show Filters
                </>
              )}
            </div>
            <div
              className={styles.ShowOrdersButton}
              onClick={handleRightButton}
            >
              {showFilters || showOrders ? (
                <>
                  <CancelIcon className={styles.topBarIcon} />
                  Cancel
                </>
              ) : (
                <>
                  <SortIcon className={styles.topBarIcon} />
                  Sort Products
                </>
              )}
            </div>
          </div>
          <div className={styles.productInner}>
            <h1>{props.title}</h1>
          </div>
        </div>
        <div className={styles.OrderArea}>
          <OrderBy page={props.page} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
