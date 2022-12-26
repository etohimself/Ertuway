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
import { useRouter } from "next/router";

function CategoryPage(props) {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [mainCategory, setMainCategory] = useState("");

  const {
    resetFilters,
    updateFilters,
    updateFilterContextProducts,
    updateFilterContextSubCategories,
    filter_subcategory,
    filter_price,
    filter_color,
    filter_rating,
    filter_warranty,
    filter_sortby,
    list_sortby,
    slicerReady,
  } = useContext(FilterContext);

  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);
  const [titleText, setTitleText] = useState("");

  const handleLeftButton = () => {
    setShowFilters(1);
  };

  //WHEN PAGE LOADS OR CHANGES
  useEffect(() => {
    setDataFetched(0);
    setProductsToDisplay([]);
    setProducts([]);
    resetFilters();
  }, [router]);

  // DETECT MAIN CATEGORY FROM ROUTER
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query && router.query.routes && router.query.routes.length) {
      setMainCategory(router.query.routes[0]);
    }
  }, [router.isReady, router.query]);

  const handleRightButton = () => {
    if (showFilters || showOrders) {
      //Something already shown, therefore this serves as Cancel button
      setShowFilters(0);
      setShowOrders(0);
    } else {
      setShowOrders(1);
    }
  };

  // MAIN CATEGORY IS DETECTED, LETS FETCH PRODUCTS AND SUBCATEGORIES
  useEffect(() => {
    if (mainCategory == "") return;
    let productAPI = `${location.protocol}//${location.hostname}:27469/products?maincategory=${mainCategory}`;
    fetch(productAPI)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));

    let categoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories?maincategory=${mainCategory}`;
    fetch(categoryAPI)
      .then((res) => res.json())
      .then((data) => {
        setSubcategories(data);
      })
      .catch((err) => console.log(err));
  }, [mainCategory]);

  //DATA ARRIVED, LETS SEND IT TO FILTERCONTEXT SO IT UPDATES AVAILABLE SLICER OPTIONS
  useEffect(() => {
    if (
      products.length &&
      products[0].viewCount &&
      subCategories.length &&
      subCategories[0].shortname
    ) {
      //valid data arrived
      updateFilterContextProducts(products);
      updateFilterContextSubCategories(subCategories);
    }
  }, [products, subCategories]);

  //UPDATE DISPLAYED PRODUCTS ACCORDING TO CURRENT SLICER VALUES
  function filterProductData(product) {
    return (
      (product.subcategory == filter_subcategory ||
        filter_subcategory == "all") &&
      product.price >= filter_price.min &&
      (product.price <= filter_price.max ||
        filter_price.max <= filter_price.min) &&
      (product.availableColors.includes(filter_color.color) ||
        filter_color.color == "all") &&
      ((product.rating <= filter_rating.stars + 0.5 &&
        product.rating >= filter_rating.stars - 0.5) ||
        filter_rating.stars == -1) &&
      (product.warranty == filter_warranty.value || filter_warranty.value == 0)
    );
  }

  function sortProductData(a, b) {
    if (filter_sortby.value == 0) {
      //Recommended Order ==  Sort By (Rating * Sold)
      return a.soldCount * a.rating > b.soldCount * b.rating ? -1 : 1;
    } else if (filter_sortby.value == 1) {
      //Sort by Highest to Lowest Price
      return a.price > b.price ? -1 : 1;
    } else if (filter_sortby.value == 2) {
      //Sort by Lowest to Highest Price
      return a.price < b.price ? -1 : 1;
    } else if (filter_sortby.value == 3) {
      //Sort By Most Sold First
      return a.soldCount > b.soldCount ? -1 : 1;
    } else if (filter_sortby.value == 4) {
      //Sort By Most Viewed First
      return a.viewCount > b.viewCount ? -1 : 1;
    } else if (filter_sortby.value == 5) {
      //Sort By Most Viewed First
      return a.salePercentage > b.salePercentage ? -1 : 1;
    }
    return 1;
  }

  useEffect(() => {
    setProductsToDisplay(
      products
        .filter((item) => filterProductData(item))
        .sort((a, b) => sortProductData(a, b))
    );
  }, [
    filter_subcategory,
    filter_price,
    filter_color,
    filter_rating,
    filter_warranty,
    filter_sortby,
  ]);

  useEffect(() => {
    if (slicerReady && products.length) {
      setProductsToDisplay(
        products
          .filter((item) => filterProductData(item))
          .sort((a, b) => sortProductData(a, b))
      );
      setDataFetched(1); //We are ready...
    }
  }, [slicerReady]);

  /*
  useEffect(() => {
    if (filter_event != "all") {
      setTitleText(eventList.filter((x) => x.event == filter_event)[0].title);
    } else if (filter_maincategory != "all" && filter_subcategory == "all") {
      setTitleText(
        pageList.filter((pg) => pg.shortname == filter_maincategory)[0].title
      );
    } else if (filter_subcategory != "all") {
      setTitleText(
        productDB.filter((subcat) => subcat.shortname == filter_subcategory)[0]
          .categoryName
      );
    }
  }, [filter_maincategory, filter_event, filter_subcategory]);

  useEffect(() => {
    //In case the user resizes window, hide filters and order
    if (showOrders || showFilters) {
      handleRightButton();
    }
  }, [myWidth]); */

  return (
    <div className={styles.CategoryPageContainer} ref={containerRef}>
      <div
        className={`${styles.innerContainer} ${
          showFilters && styles.showFilters
        } ${showOrders && styles.showOrders}`}
      >
        <div className={styles.SlicerArea}>
          {dataFetched ? <Slicers skeleton={0} /> : <Slicers skeleton={1} />}
        </div>
        <div className={styles.ProductArea}>
          {dataFetched ? (
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
          ) : (
            ""
          )}
          <div className={styles.productInner}>
            <h1 className={styles.pageTitle}>{titleText}</h1>
            {dataFetched ? (
              <ProductList list={productsToDisplay} />
            ) : (
              <ProductList skeleton={1} />
            )}
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
