import styles from "../styles/OrdersPage.module.css";
import ShippingIcon from "../components/Icons/ShippingIcon";
import HeartIcon from "../components/Icons/HeartIcon";
import getLocalStorageOrders from "../Helpers/getLocalStorageOrders.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function OrdersPage(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [storedOrders, setStoredOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    var ordersInLocalStorage = getLocalStorageOrders();
    const fetchData = async () => {
      if (ordersInLocalStorage.length) {
        for (let i = 0; i < ordersInLocalStorage.length; i++) {
          if (!ordersInLocalStorage[i].products) return;
          if (!ordersInLocalStorage[i].products.length) return;
          if (!ordersInLocalStorage[i].products[0].id) return;
          let productAPI = `${location.protocol}//${location.hostname}:27469/products?id=${ordersInLocalStorage[i].products[0].id}`;
          let res_product = await fetch(productAPI);
          let data_product = await res_product.json();
          ordersInLocalStorage[i].imgSmall = data_product[0].imgSmall;
        }
      }
      setStoredOrders(ordersInLocalStorage);
      setDataFetched(1);
    };
    fetchData();
  }, []);

  if (dataFetched) {
    return (
      <div className={styles.OrdersContainer}>
        <div className={styles.AccountNavbar}>
          <div
            className={`${styles.NavLink} ${styles.active}`}
            onClick={() => router.push("/orders")}
          >
            <ShippingIcon className={styles.ShippingIcon} />
            My Orders
          </div>
          <div
            className={`${styles.NavLink}`}
            onClick={() => router.push("/wishlist")}
          >
            <HeartIcon className={styles.HeartIcon} />
            My Wishlist
          </div>
        </div>
        <div className={styles.ContentArea}>
          <h2>My Orders</h2>
          {storedOrders.length
            ? storedOrders.map((eachOrder, i) => {
                return (
                  <div
                    className={styles.orderContainer}
                    key={i}
                    onClick={() =>
                      router.push("/order/" + eachOrder.orderNumber)
                    }
                  >
                    <Image
                      width={100}
                      height={100}
                      className={styles.orderImg}
                      src={eachOrder.imgSmall}
                      alt="First Item Image"
                    />
                    <div className={styles.productInfo}>
                      <div className={styles.productRow}>
                        <b>Order Number:</b>
                        <div className={styles.orderNumber}>
                          {eachOrder.orderNumber}
                        </div>
                      </div>
                      <div className={styles.productRow}>
                        <div className={styles.orderDate}>
                          Purchase Date : <br />
                          {`${new Date(eachOrder.orderDateTime).toLocaleString(
                            "en-US"
                          )}`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "You have no previous orders yet.."}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.OrdersContainer}>
        <div className={styles.AccountNavbarSkeleton} />
        <div className={styles.ContentAreaSkeleton} />
      </div>
    );
  }
}

export default OrdersPage;
