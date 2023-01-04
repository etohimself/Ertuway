import { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/CategoryPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import ProductList from "./ProductList.js";
import { FilterContext } from "../contexts/filterContext";
import { useRouter } from "next/router";

function CategoryPage(props) {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(0);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const [mainCategory, setMainCategory] = useState("");
  const containerRef = useRef();
  const [titleText, setTitleText] = useState("");
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
    set_filter_subcategory,
    set_filter_sortby,
  } = useContext(FilterContext);

  //WHEN PAGE LOADS OR ROUTE CHANGES
  useEffect(() => {
    let route_maincategory = "";
    let secondParam = "";
    let thirdParam = "";
    //Show lazy loading regardless
    setDataFetched(0);
    setProducts([]);
    setProductsToDisplay([]);
    //Wait until router object is ready
    if (!router.isReady) return;
    //Check for valid category
    if (router.query && router.query.routes && router.query.routes.length) {
      route_maincategory = router.query.routes[0];
      if (router.query.routes.length > 1) {
        secondParam = router.query.routes[1];
      }
      if (router.query.routes.length > 2) {
        thirdParam = router.query.routes[2];
      }
    }
    //Fetch products and subcategories
    const fetchData = async () => {
      let productAPI = `${location.protocol}//${location.hostname}:27469/products?maincategory=${route_maincategory}`;
      let categoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories?maincategory=${route_maincategory}`;
      let pagelistAPI = `${location.protocol}//${location.hostname}:27469/pagelist`;
      let res_products = await fetch(productAPI);
      let data_products = await res_products.json();
      let res_subcategories = await fetch(categoryAPI);
      let data_subcategories = await res_subcategories.json();
      let res_pagelist = await fetch(pagelistAPI);
      let data_pagelist = await res_pagelist.json();

      //Check if the data we received is valid
      if (
        data_products.length &&
        data_products[0].viewCount &&
        data_subcategories.length &&
        data_subcategories[0].shortname
      ) {
        //send data to filter context so it prepares the slicers
        resetFilters();
        updateFilterContextProducts(data_products);
        updateFilterContextSubCategories(data_subcategories);
        //if there is a valid subcategory in routes, send that to the filter context as well so subcategory slicer displays it on load
        if (
          data_subcategories.filter(
            (x) => x.shortname == route_maincategory + "_" + secondParam
          ).length
        ) {
          set_filter_subcategory(route_maincategory + "_" + secondParam);
          //If the third para mis a sort command
          if (thirdParam == "mostviewed") {
            set_filter_sortby({ value: 4 });
          } else if (thirdParam == "bestsellers") {
            set_filter_sortby({ value: 3 });
          } else if (thirdParam == "bestdeals") {
            set_filter_sortby({ value: 5 });
          }
        }
        //if the second param is a sort command instead of a subcategory
        else if (secondParam == "mostviewed") {
          set_filter_sortby({ value: 4 });
        } else if (secondParam == "bestsellers") {
          set_filter_sortby({ value: 3 });
        } else if (secondParam == "bestdeals") {
          set_filter_sortby({ value: 5 });
        }

        setProducts(data_products);
        setSubCategories(data_subcategories);
        setMainCategory(route_maincategory);
        setPageList(data_pagelist);
        //Lets wait for slicer to be ready
      }
    };
    fetchData();
  }, [router]);

  //When Slicer is Ready..
  useEffect(() => {
    if (slicerReady && products.length) {
      //Slicer is ready, products are ready, lets calculate what to display initally
      RefreshContents();
      setDataFetched(1); //Display products
    }
  }, [slicerReady]);

  //If Slicers are changed, refresh again
  useEffect(() => {
    RefreshContents();
  }, [
    filter_subcategory,
    filter_price,
    filter_color,
    filter_rating,
    filter_warranty,
    filter_sortby,
  ]);

  //FUNCTIONS USED TO REFRESH, SORT, FILTER...
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

  function RefreshContents() {
    setProductsToDisplay(
      products
        .filter((item) => filterProductData(item))
        .sort((a, b) => sortProductData(a, b))
    );
    //Lets also calculatet the title
    if (filter_subcategory != "all") {
      //If we are viewing a subcategory, display it's title
      let findcategory = subCategories.find(
        (cat) => cat.shortname == filter_subcategory
      );
      if (findcategory && findcategory.categoryName) {
        setTitleText(findcategory.categoryName);
      }
    } else {
      //Otherwise display the main category's shortname, it will be capitalized by CSS
      let findpage = pageList.find((x) => x.shortname == mainCategory);
      if (findpage) setTitleText(findpage.title);
    }
  }

  const handleRightButton = () => {
    if (showFilters || showOrders) {
      //Something already shown, therefore this serves as Cancel button
      setShowFilters(0);
      setShowOrders(0);
    } else {
      setShowOrders(1);
    }
  };
  const handleLeftButton = () => {
    setShowFilters(1);
  };

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
