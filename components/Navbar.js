import styles from "../styles/Navbar.module.css";
import BrandLogo from "./BrandLogo";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import SearchBox from "./SearchBox";
import { useContext, useState } from "react";
import { ProductContext } from "../contexts/productContext";

function Navbar(props) {
  const { productDB } = useContext(ProductContext);
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
  ); //Get distintcs

  function validCategory(catName) {
    return mainCategories.indexOf(catName) > -1;
  }

  return (
    <>
      <div className={styles.NavbarContainer}>
        <div className={styles.BrandAreaMobile}>
          <BrandLogo />
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
          {pageList.map((x) => {
            return (
              <div
                className={`${styles.NavbarCategory} ${
                  props.page == x.shortname && styles.isActive
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
                      .map((subcat) => <p>{subcat.categoryName}</p>)}
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
