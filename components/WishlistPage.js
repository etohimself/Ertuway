import styles from "../styles/WishlistPage.module.css";
import ShippingIcon from "../components/Icons/ShippingIcon";
import HeartIcon from "../components/Icons/HeartIcon";
import getLocalStorageWishlist from "../Helpers/getLocalStorageWishlist.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductItem from "./ProductItem";

function WishlistPage(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [storedWishlist, setStoredWishlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let totalItems = [];
      let productsInLocalStorage = getLocalStorageWishlist();

      if (productsInLocalStorage.length) {
        for (let i = 0; i < productsInLocalStorage.length; i++) {
          if (!productsInLocalStorage[i].id) return;
          let productAPI = `${location.protocol}//${location.hostname}:27469/products?id=${productsInLocalStorage[i].id}`;
          let res_product = await fetch(productAPI);
          let data_product = await res_product.json();
          if (data_product[0].sellers) {
            //Data is valid
            totalItems.push(data_product[0]);
          }
        }
      }
      setStoredWishlist(totalItems);
      setDataFetched(1);
    };
    fetchData();
  }, []);

  if (dataFetched) {
    return (
      <div className={styles.WishlistContainer}>
        <div className={styles.AccountNavbar}>
          <div
            className={`${styles.NavLink}`}
            onClick={() => router.push("/orders")}
          >
            <ShippingIcon className={styles.ShippingIcon} />
            My Orders
          </div>
          <div
            className={`${styles.NavLink} ${styles.active}`}
            onClick={() => router.push("/wishlist")}
          >
            <HeartIcon className={styles.HeartIcon} />
            My Wishlist
          </div>
        </div>
        <div className={styles.ContentArea}>
          <h2>My Wishlist</h2>
          <div className={styles.itemArea}>
            {storedWishlist.length
              ? storedWishlist.map((eachOrder, i) => {
                  return <ProductItem data={eachOrder} key={eachOrder.id} />;
                })
              : "You have no previous Wishlist yet.."}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.WishlistContainer}>
        <div className={styles.AccountNavbarSkeleton} />
        <div className={styles.ContentAreaSkeleton} />
      </div>
    );
  }
}

export default WishlistPage;
