import styles from "../styles/MobileMenu.module.css";
import HomeIcon from "../components/Icons/HomeIcon";
import UserIcon from "../components/Icons/UserIcon";
import CartIcon from "../components/Icons/CartIcon";
import CategoriesIcon from "../components/Icons/CategoriesIcon";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function MobileMenu(props) {
  const router = useRouter();
  const { authData } = useContext(AuthContext);

  return (
    <div
      className={styles.MobileMenuContainer}
      onClick={() => router.push("/")}
    >
      <div className={styles.MobileMenuButton}>
        <HomeIcon className={styles.MobileMenuIcons} />
        <p>Home</p>
      </div>
      <div className={styles.MobileMenuButton}>
        <CategoriesIcon className={styles.MobileMenuIcons} />
        <p>Categories</p>
      </div>
      <div
        className={styles.MobileMenuButton}
        onClick={() => authData <= 0 && router.push("/login")}
      >
        <UserIcon className={styles.MobileMenuIcons} />
        <p>{authData.username ? `My Account` : `Sign In`}</p>
      </div>
      <div
        className={styles.MobileMenuButton}
        onClick={() => router.push("/cart")}
      >
        <CartIcon className={styles.MobileMenuIcons} />
        <p>My Cart</p>
      </div>
    </div>
  );
}

export default MobileMenu;
