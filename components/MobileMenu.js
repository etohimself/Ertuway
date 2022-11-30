import styles from "../styles/MobileMenu.module.css";
import HomeIcon from "../components/Icons/HomeIcon";
import UserIcon from "../components/Icons/UserIcon";
import CartIcon from "../components/Icons/CartIcon";
import CategoriesIcon from "../components/Icons/CategoriesIcon";

function MobileMenu(props) {
  return (
    <div className={styles.MobileMenuContainer}>
      <div className={styles.MobileMenuButton}>
        <HomeIcon className={styles.MobileMenuIcons} />
        <p>Home</p>
      </div>
      <div className={styles.MobileMenuButton}>
        <CategoriesIcon className={styles.MobileMenuIcons} />
        <p>Categories</p>
      </div>
      <div className={styles.MobileMenuButton}>
        <UserIcon className={styles.MobileMenuIcons} />
        <p>My Account</p>
      </div>
      <div className={styles.MobileMenuButton}>
        <CartIcon className={styles.MobileMenuIcons} />
        <p>My Cart</p>
      </div>
    </div>
  );
}

export default MobileMenu;
