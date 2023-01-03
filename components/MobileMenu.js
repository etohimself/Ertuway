import styles from "../styles/MobileMenu.module.css";
import HomeIcon from "../components/Icons/HomeIcon";
import UserIcon from "../components/Icons/UserIcon";
import CartIcon from "../components/Icons/CartIcon";
import CategoriesIcon from "../components/Icons/CategoriesIcon";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { FilterContext } from "../contexts/filterContext";

function MobileMenu(props) {
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  const { setMobileMenuVisibility, itemsInCart } = useContext(FilterContext);

  const showMobileMenu = () => {
    setMobileMenuVisibility(1);
  };

  return (
    <div className={styles.MobileMenuContainer}>
      <div
        className={`${styles.MobileMenuButton} ${
          props.root == "index" && styles.navActive
        }`}
        onClick={() => router.push("/")}
      >
        <HomeIcon className={styles.MobileMenuIcons} />
        <p>Home</p>
      </div>
      <div
        className={`${styles.MobileMenuButton} ${
          props.root == "menu" && styles.navActive
        }`}
        onClick={showMobileMenu}
      >
        <CategoriesIcon className={styles.MobileMenuIcons} />
        <p>Categories</p>
      </div>
      <div
        className={`${styles.MobileMenuButton} ${
          props.root == "account" && styles.navActive
        }`}
        onClick={() => authData <= 0 && router.push("/login")}
      >
        <UserIcon className={styles.MobileMenuIcons} />
        <p>{authData.username ? `My Account` : `Sign In`}</p>
      </div>
      <div
        className={`${styles.MobileMenuButton} ${
          props.root == "cart" && styles.navActive
        }`}
        onClick={() => router.push("/cart")}
      >
        <div
          className={`${styles.badge} ${itemsInCart && styles.badgeVisible}`}
        >
          {itemsInCart ? itemsInCart : ""}
        </div>
        <CartIcon className={styles.MobileMenuIcons} />
        <p>My Cart</p>
      </div>
    </div>
  );
}

export default MobileMenu;
