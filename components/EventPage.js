import { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/EventPage.module.css";
import Slicers from "./Slicers";
import FilterIcon from "./Icons/FilterIcon";
import SortIcon from "./Icons/SortIcon";
import CancelIcon from "./Icons/CancelIcon";
import OrderBy from "./OrderBy";
import useElementWidth from "./hooks/useElementWidth";
import ProductList from "./ProductList.js";
import { FilterContext } from "../contexts/filterContext";
import { useRouter } from "next/router";

function EventPage(props) {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(0);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [showFilters, setShowFilters] = useState(0);
  const [showOrders, setShowOrders] = useState(0);
  const containerRef = useRef();
  const myWidth = useElementWidth(containerRef);
  const [titleText, setTitleText] = useState("");
  const [currentEvent, setCurrentEvent] = useState();

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
    let route_event = "";
    //Show lazy loading regardless
    setDataFetched(0);
    setProducts([]);
    setProductsToDisplay([]);
    //Wait until router object is ready
    if (!router.isReady) return;
    //Check for valid category
    if (router.query && router.query.routes && router.query.routes.length) {
      route_event = router.query.routes[0];
    }

    //console.log("Event detected = " + route_event);

    //Fetch products and subcategories
    const fetchData = async () => {
      let productAPI = `${location.protocol}//${location.hostname}:27469/products?event=${route_event}`;
      let eventlistAPI = `${location.protocol}//${location.hostname}:27469/eventlist`;
      let res_products = await fetch(productAPI);
      let data_products = await res_products.json();
      let res_events = await fetch(eventlistAPI);
      let data_events = await res_events.json();

      //console.log("Fetched data..");
      //console.log(data_events);
      //console.log(data_products);

      //Check if the data we received is valid
      if (
        data_products.length &&
        data_products[0].viewCount &&
        data_events.length &&
        data_events[0].eventName
      ) {
        //send data to filter context so it prepares the slicers

        //Calculate subcategories
        let subcats = [...new Set(data_products.map((x) => x.subcategory))];
        //console.log("Data valid.. Calculating unique subcategories : ");
        //console.log(subcats);
        //console.log("Fetching all subcategories..");

        let categoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories`;
        let res_category = await fetch(categoryAPI);
        let data_category = await res_category.json();

        //console.log(data_category);

        if (data_category.length && data_category[0].categoryName) {
          //Valid subcategories arrived, lets filter them

          let filteredSubCategories = data_category.filter((cat) =>
            subcats.includes(cat.shortname)
          );

          // console.log(
          //   "Filtered subcategory data according to discounted products.."
          // );
          // console.log(filteredSubCategories);

          resetFilters();
          updateFilterContextProducts(data_products);
          updateFilterContextSubCategories(filteredSubCategories);
          setProducts(data_products);
          setEventList(data_events);
          setCurrentEvent(route_event);
          setSubCategories(filteredSubCategories);

          //console.log("Waiting for slicers to update..");
        }

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
    //Lets also calculate the title
    let foundevent = eventList.filter((ev) => ev.shortname == currentEvent);
    if (foundevent.length) {
      setTitleText(foundevent[0].title);
    }
  }
  /*
  useEffect(() => {
    //In case the user resizes window, hide filters and order
    if (showOrders || showFilters) {
      handleRightButton();
    }
  }, [myWidth]); */

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
    <div className={styles.EventPageContainer} ref={containerRef}>
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

export default EventPage;
