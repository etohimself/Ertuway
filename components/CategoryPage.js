import { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import useElementWidth from "./hooks/useElementWidth";
import ProductList from "./ProductList.js";
import { FilterContext } from "../contexts/filterContext";

function CategoryPage(props) {
  const {
    filter_maincategory,
    list_sortby,
    filter_sortby,
    updateFilters,
  } = useContext(FilterContext);

  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);

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
          <Slicers page={filter_maincategory} />
        </div>
        <div className={styles.ProductArea}>
          {filter_maincategory && (
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
                  <span className={styles.topbarButtonText}>Show Filters</span>
                </div>
              )}

              <div
                className={styles.ShowOrdersButton}
                onClick={handleRightButton}
              >
                {showFilters || showOrders ? (
                  <>
                    <CancelIcon className={styles.topBarIcon} />
                    <span className={styles.topbarButtonText}>Close</span>
                  </>
                ) : (
                  <>
                    <SortIcon className={styles.topBarIcon} />
                    <span className={styles.topbarButtonText}>
                      Sort Products
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          <div className={styles.productInner}>
            <h1 className={styles.pageTitle}>
              {filter_maincategory &&
                filter_maincategory != "all" &&
                filter_maincategory}
            </h1>
            <ProductList />
          </div>
        </div>
        <div className={styles.OrderArea}>
          <OrderBy
            list={list_sortby}
            value={filter_sortby}
            onSelect={updateFilters}
          />
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
