import styles from "../styles/Navbar.module.css";
import BrandLogo from "./BrandLogo";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import SearchBox from "./SearchBox";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/productContext";
import { FilterContext } from "../contexts/filterContext";
import { useRouter } from "next/router";

function Navbar(props) {
  const { productDB } = useContext(ProductContext);
  const { set_filter_subcategory, set_filter_maincategory, set_filter_sortby } =
    useContext(FilterContext);

  const router = useRouter();
  const { routes } = router.query;
  const [currentPage, setCurrentPage] = useState("");
  const [showDropdown, setShowdropdown] = useState("");

  const pageList = [
    { title: "Home", shortname: "index", isMainCategory: 0 },
    { title: "Best Deals", shortname: "bestdeals", isMainCategory: 0 },
    { title: "Best Sellers", shortname: "bestsellers", isMainCategory: 0 },
    { title: "Electronics", shortname: "electronics", isMainCategory: 1 },
    { title: "Fashion", shortname: "fashion", isMainCategory: 1 },
    { title: "Health & Beauty", shortname: "health", isMainCategory: 1 },
    { title: "Home & Garden", shortname: "home", isMainCategory: 1 },
    { title: "Automotive", shortname: "car", isMainCategory: 1 },
    { title: "Consumables", shortname: "consumable", isMainCategory: 1 },
    { title: "Supermarket", shortname: "supermarket", isMainCategory: 1 },
    { title: "Hobby & Art", shortname: "hobby", isMainCategory: 1 },
  ];

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
        setCurrentPage("index");
        matched = 1;
      } else if (
        props.root == "bestsellers" ||
        props.root == "bestdeals" ||
        props.root == "mostviewed"
      ) {
        //Best pages
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        setCurrentPage(props.root);
        matched = 1;
      }
    } else if (routes.length && routes.length == 1) {
      //Single route param
      if (props.root == "special") {
        //Special event page
        set_filter_maincategory("all");
        set_filter_subcategory("all");
        setCurrentPage(props.root);
        matched = 1;
      } else if (
        pageList.filter(
          (x) => x.shortname == routes[0] && x.isMainCategory == 1
        ).length
      ) {
        //Main category page
        set_filter_maincategory(routes[0]);
        set_filter_subcategory("all");
        setCurrentPage(routes[0]);
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
          set_filter_subcategory(routes[0] + "_" + routes[1]);
          setCurrentPage(routes[0]);
          matched = 1;
        } else if (routes[1] == "bestdeals") {
          set_filter_maincategory(routes[0]);
          set_filter_subcategory("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 5 });
          matched = 1;
        } else if (routes[1] == "bestsellers") {
          set_filter_maincategory(routes[0]);
          set_filter_subcategory("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 3 });
          matched = 1;
        } else if (routes[1] == "mostviewed") {
          set_filter_maincategory(routes[0]);
          set_filter_subcategory("all");
          setCurrentPage(routes[0]);
          set_filter_sortby({ value: 4 });
          matched = 1;
        }
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
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 5 });
            matched = 1;
          } else if (routes[2] == "bestsellers") {
            set_filter_maincategory(routes[0]);
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 3 });
            matched = 1;
          } else if (routes[2] == "mostviewed") {
            set_filter_maincategory(routes[0]);
            set_filter_subcategory(routes[0] + "_" + routes[1]);
            setCurrentPage(routes[0]);
            set_filter_sortby({ value: 4 });
            matched = 1;
          }
        }
      }
    }

    if (!matched) {
      //Unrecognized page
      router.push("/");
    }
  }, [router.isReady, routes]);

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
            <div className={styles.CartButton}>
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
          <div className={styles.CartButton}>
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
