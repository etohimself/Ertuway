import { useState, useRef, useEffect } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import useElementWidth from "./hooks/useElementWidth";

function CategoryPage(props) {
  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);
  const [filterData, setFilterData] = useState({});

  const handleSlicerChange = (payload) => {
    if (payload.invoker == "category_slicer") {
      //Redirect to that category here..
    } else {
      setFilterData((prevData) => {
        let currentData = { ...prevData };
        currentData[payload.invoker] = payload.data;
        return currentData;
      });
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

  useEffect(() => {
    console.log(filterData);
    //Here, I must filter & sort the products with reasonable logic
  }, [filterData]);

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
                Show Filters
              </div>
            )}

            <div
              className={styles.ShowOrdersButton}
              onClick={handleRightButton}
            >
              {showFilters || showOrders ? (
                <>
                  <CancelIcon className={styles.topBarIcon} />
                  Close
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
          <OrderBy onChange={handleSlicerChange} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
