import styles from "../styles/Navbar.module.css";
import BrandLogo from "./BrandLogo";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import SearchBox from "./SearchBox";

function Navbar(props) {
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
        <div className={styles.NavbarCategoryPlaceHolder} />
        <div className={styles.NavbarCategoryItems}>
          <div className={`${styles.NavbarCategory} ${styles.isActive}`}>
            Home
          </div>
          <div className={`${styles.NavbarCategory}`}>Best Deals</div>
          <div className={`${styles.NavbarCategory}`}>Best Sellers</div>
          <div className={`${styles.NavbarCategory}`}>Electronics</div>
          <div className={`${styles.NavbarCategory}`}>Fashion</div>
          <div className={`${styles.NavbarCategory}`}>Health & Beauty</div>
          <div className={`${styles.NavbarCategory}`}>Home & Garden</div>
          <div className={`${styles.NavbarCategory}`}>Automotive</div>
          <div className={`${styles.NavbarCategory}`}>Consumables</div>
          <div className={`${styles.NavbarCategory}`}>Supermarket</div>
          <div className={`${styles.NavbarCategory}`}>Hobby & Art</div>
        </div>
        <div className={styles.NavbarCategoryPlaceHolder} />
      </div>
    </>
  );
}

export default Navbar;
