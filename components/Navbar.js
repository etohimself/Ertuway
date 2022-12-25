import styles from "../styles/Navbar.module.css";
import BrandLogo from "./BrandLogo";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import SearchBox from "./SearchBox";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/productContext";
import { PageContext } from "../contexts/pageContext";
import { FilterContext } from "../contexts/filterContext";
import { useRouter } from "next/router";

function Navbar(props) {
  const { productDB, setCurrentProduct, setSellerIndex } =
    useContext(ProductContext);
  const {
    set_filter_subcategory,
    set_filter_maincategory,
    set_filter_sortby,
    set_filter_event,
    set_routes_rendered,
  } = useContext(FilterContext);

  const router = useRouter();
  const { routes } = router.query;
  const [currentPage, setCurrentPage] = useState("");
  const [showDropdown, setShowdropdown] = useState("");
  const { eventList, pageList } = useContext(PageContext);

  var mainCategories = [];
  productDB.forEach((cat) => mainCategories.push(cat.maincategory));
  mainCategories = mainCategories.filter(
    (x, i) => mainCategories.indexOf(x) == i
  ); //Get distincts

  function validCategory(catName) {
    return mainCategories.indexOf(catName) > -1;
  }

  function handleCategoryClick(shortname) {
    if (shortname == "index") {
      router.push("/");
    } else {
      router.push("/" + shortname);
    }
  }

  function handleSubcategoryClick(maincategory, subcategory) {
    router.push(
      "/" + maincategory + "/" + subcategory.split(maincategory + "_")[1]
    );
  }

  useEffect(() => {
    if (!router.isReady) return;
    let matched = 0;

    if (!routes) {
      //No route params
      if (props.root == "") {
        //Home Page
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage("index");
        set_routes_rendered(1);
        matched = 1;
      } else if (
        props.root == "bestsellers" ||
        props.root == "bestdeals" ||
        props.root == "mostviewed"
      ) {
        //Best pages
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage(props.root);
        set_routes_rendered(1);
        matched = 1;
      } else if (props.root == "special") {
        if (
          router.query.event &&
          router.query.event.length > 0 &&
          eventList &&
          eventList.filter((evt) => evt.event == router.query.event).length
        ) {
          //Special event page
          set_filter_maincategory("all");
          set_filter_subcategory("all");
          set_filter_event(router.query.event);
          setCurrentPage(props.root);
          set_routes_rendered(1);
          matched = 1;
        }
      } else if (props.root == "product") {
        if (router.query.pid && router.query.pid.length > 0) {
          let found = 0;
          productDB.forEach((cat) =>
            cat.products.forEach((item) => {
              if (item.id == router.query.pid && !found) {
                found = 1;
                set_filter_maincategory("all");
                set_filter_subcategory("all");
                set_filter_event("all");
                setCurrentPage(props.root);
                setCurrentProduct(item);
                set_routes_rendered(1);
                setSellerIndex(0);
                matched = 1;
              }
            })
          );
        }
      } else if (props.root == "cart") {
        //Cart Page
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage("cart");
        set_routes_rendered(1);
        matched = 1;
      } else if (props.root == "login") {
        //Login Page
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage("login");
        set_routes_rendered(1);
        matched = 1;
      } else if (props.root == "checkout") {
        //Cart Page
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage("checkout");
        set_routes_rendered(1);
        matched = 1;
      }
    } else if (routes.length && routes.length == 1) {
      //Single route param
      if (
        pageList.filter(
          (x) => x.shortname == routes[0] && x.isMainCategory == 1
        ).length
      ) {
        //Main category page
        set_filter_maincategory(routes[0]);
        set_filter_subcategory("all");
        set_filter_event("all");
        setCurrentPage(routes[0]);
        set_routes_rendered(1);
        matched = 1;
      }
    } else if (routes.length && routes.length == 2) {
      //Two route params
      //electronics/mostviewed etc..
      //electronics/computer
      if (
        pageList.filter(
          (x) => x.shortname == routes[0] && x.isMainCategory == 1
        ).length
      ) {
        if (
          productDB.filter(
            (cat) => cat.shortname == routes[0] + "_" + routes[1]
          ).length
        ) {
          //maincategory/subcategory
          set_filter_maincategory(routes[0]);
          set_filter_event("all");
          set_filter_subcategory(routes[0] + "_" + routes[1]);
          setCurrentPage(routes[0]);
          set_routes_rendered(1);
          matched = 1;
        } else if (routes[1] == "bestdeals") {
          set_filter_maincategory(routes[0]);
          set_filter_event("all");
          set_filter_subcategory("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 5 });
          set_routes_rendered(1);
          matched = 1;
        } else if (routes[1] == "bestsellers") {
          set_filter_maincategory(routes[0]);
          set_filter_subcategory("all");
          set_filter_event("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 3 });
          set_routes_rendered(1);
          matched = 1;
        } else if (routes[1] == "mostviewed") {
          set_filter_maincategory(routes[0]);
          set_filter_subcategory("all");
          set_filter_event("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 4 });
          set_routes_rendered(1);
          matched = 1;
        }
      } else if (props.root == "product") {
        let found = 0;
        productDB.forEach((cat) =>
          cat.products.forEach((item) => {
            if (item.id == routes[0] && !found) {
              let findSellerIndex = item.sellers.findIndex(
                (eachSeller) => eachSeller.storeName == routes[1]
              );
              if (findSellerIndex > -1) {
                found = 1;
                set_filter_maincategory("all");
                set_filter_subcategory("all");
                set_filter_event("all");
                setCurrentPage("product");
                setCurrentProduct(item);
                set_routes_rendered(1);
                setSellerIndex(findSellerIndex);
                matched = 1;
              }
            }
          })
        );
      }
    } else if (routes.length && routes.length == 3) {
      //Three route params
      //electronics/mostviewed/bestseller etc.
      if (
        pageList.filter(
          (x) => x.shortname == routes[0] && x.isMainCategory == 1
        ).length
      ) {
        if (
          productDB.filter(
            (cat) => cat.shortname == routes[0] + "_" + routes[1]
          ).length
        ) {
          if (routes[2] == "bestdeals") {
            set_filter_maincategory(routes[0]);
            set_filter_event("all");
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 5 });
            set_routes_rendered(1);
            matched = 1;
          } else if (routes[2] == "bestsellers") {
            set_filter_maincategory(routes[0]);
            set_filter_event("all");
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 3 });
            set_routes_rendered(1);
            matched = 1;
          } else if (routes[2] == "mostviewed") {
            set_filter_maincategory(routes[0]);
            set_filter_event("all");
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 4 });
            set_routes_rendered(1);
            matched = 1;
          }
        }
      }
    }

    if (!matched) {
      //Unrecognized page
      set_routes_rendered(0);
      router.push("/");
    }
  }, [router.isReady, routes, router]);

  return (
    <>
      <div className={styles.NavbarContainer}>
        <div className={styles.BrandAreaMobile}>
          <BrandLogo text="Ertuway" />
          <div className={styles.NavbarButtonsContainerMobile}>
            <div className={styles.AccountButton}>
              <UserIcon className={styles.navbarButtonIcons} />
              Sign In
            </div>
            <div
              className={styles.CartButton}
              onClick={() => router.push("/cart")}
            >
              <CartIcon className={styles.navbarButtonIcons} />
              My Cart
            </div>
          </div>
        </div>

        <SearchBox />
        <div className={styles.NavbarButtonsContainer}>
          <div className={styles.AccountButton}>
            <UserIcon className={styles.navbarButtonIcons} />
            Sign In
          </div>
          <div
            className={styles.CartButton}
            onClick={() => router.push("/cart")}
          >
            <CartIcon className={styles.navbarButtonIcons} />
            My Cart
          </div>
        </div>
      </div>

      <div className={styles.NavbarCategories}>
        <div className={styles.NavbarCategoryItems}>
          {pageList.map((x, i) => {
            return (
              <div
                key={i}
                onClick={() => handleCategoryClick(x.shortname)}
                className={`${styles.NavbarCategory} ${
                  currentPage == x.shortname && styles.isActive
                }`}
                onMouseOver={() =>
                  validCategory(x.shortname) && setShowdropdown(x.shortname)
                }
                onMouseLeave={() => setShowdropdown("")}
                style={{
                  zIndex:
                    showDropdown.length > 0 && showDropdown == x.shortname
                      ? 100
                      : 0,
                }}
              >
                <span>{x.title}</span>

                <div
                  className={styles.NavbarDropdownContainer}
                  style={
                    showDropdown.length > 0 && showDropdown == x.shortname
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  {validCategory(x.shortname) &&
                    productDB
                      .filter((cat) => cat.maincategory == x.shortname)
                      .sort((a, b) =>
                        b.categoryName < a.categoryName ? -1 : 1
                      )
                      .map((subcat, i) => (
                        <p
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubcategoryClick(
                              x.shortname,
                              subcat.shortname
                            );
                            setShowdropdown("");
                          }}
                        >
                          {subcat.categoryName}
                        </p>
                      ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={styles.screenOverlay}
        style={
          showDropdown.length > 0 ? { display: "block" } : { display: "none" }
        }
      />
    </>
  );
}

export default Navbar;
