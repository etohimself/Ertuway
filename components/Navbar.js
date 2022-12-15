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
  const {
    set_filter_subcategory,
    set_filter_maincategory,
  } = useContext(FilterContext);

  const router = useRouter();
  const { routes } = router.query;
  const [currentPage, setCurrentPage] = useState("");
  const [showDropdown, setShowdropdown] = useState("");

  const pageList = [
    { title: "Home", shortname: "index" },
    { title: "Best Deals", shortname: "bestdeals" },
    { title: "Best Sellers", shortname: "bestsellers" },
    { title: "Electronics", shortname: "electronics" },
    { title: "Fashion", shortname: "fashion" },
    { title: "Health & Beauty", shortname: "health" },
    { title: "Home & Garden", shortname: "home" },
    { title: "Automotive", shortname: "car" },
    { title: "Consumables", shortname: "consumable" },
    { title: "Supermarket", shortname: "supermarket" },
    { title: "Hobby & Art", shortname: "hobby" },
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

    //Detect Main page
    if (!routes) {
      set_filter_maincategory("all");
      set_filter_subcategory("all");
      setCurrentPage("index");
      return;
    }

    //Detect remaining pages
    if (routes.length > 0) {
      let found = 0;
      pageList.forEach((x) => {
        if (x.shortname == routes[0] && !found) {
          set_filter_maincategory(routes[0]);
          setCurrentPage(routes[0]);
          //Detect subcategory
          if (routes.length > 1) {
            set_filter_subcategory(routes[0] + "_" + routes[1]);
          } else {
            set_filter_subcategory("all");
          }
          found = 1;
        }
      });

      if (!found) {
        router.push("/");
      }
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
