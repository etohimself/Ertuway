import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/CartPage.module.css";
import priceFormat from "../helpers/priceFormat";
import MinusIcon from "../components/Icons/MinusIcon";
import PlusIcon from "../components/Icons/PlusIcon";
import getLocalStorageCart from "../helpers/getLocalStorageCart.js";
import calcPrice from "../helpers/calcPrice";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/authContext";
import SpinIcon from "../components/Icons/SpinIcon";

function CartPage(props) {
  const [sumPrice, setSumPrice] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
  const [dataFetched, setDataFetched] = useState(0);
  const [productDB, setProductDB] = useState([]);
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  const [processing, setProcessing] = useState(0);

  //WHEN PAGE LOADS
  useEffect(() => {
    setDataFetched(0);
    setProductDB([]);

    //Fetch products
    const fetchData = async () => {
      let productAPI = `${location.protocol}//${location.hostname}:27469/products`;
      let res_product = await fetch(productAPI);
      let data_product = await res_product.json();

      //Check if the data we received is valid
      if (data_product.length && data_product[0].imgLarge) {
        //If data is valid, set current product
        setProductDB(data_product);
        refreshCartFromLocalStorage(data_product); //Products given, so we dont have to wait for useState to update
        setDataFetched(1);
      }
    };
    fetchData();
  }, [router]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var currentDate = new Date();
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function refreshCartFromLocalStorage(productsGiven) {
    let finalItems = [];
    let storedItems = getLocalStorageCart();
    let allProducts = [];

    if (productsGiven && productsGiven.length) {
      allProducts = productsGiven;
    } else {
      allProducts = productDB;
    }

    storedItems = storedItems.map((eachStored) => {
      let found = 0;
      allProducts.forEach((itemDB) => {
        if (itemDB.id == eachStored.id && !found) {
          found = 1;
          finalItems.push({
            ...itemDB,
            selected_seller: eachStored.seller,
            selected_options: eachStored.options,
            selected_count: eachStored.count,
          });
        }
      });
    });
    setProductsInCart(finalItems);

    setSumPrice(
      finalItems.reduce((acc, eachItem) => {
        return (
          acc +
          calcPrice(
            eachItem.sellers[eachItem.selected_seller].storePrice,
            [...eachItem.options],
            [...eachItem.selected_options]
          ) *
            parseInt(eachItem.selected_count)
        );
      }, 0)
    );
  }

  const handleIncrement = (productID) => {
    if (!dataFetched) return;

    let storedItems = getLocalStorageCart();
    if (storedItems.length) {
      storedItems = storedItems.map((eachItem) => {
        if (eachItem.id != productID) return eachItem;
        if (parseInt(eachItem.count) >= 3) return eachItem;
        return { ...eachItem, count: parseInt(eachItem.count) + 1 };
      });
    }
    localStorage.setItem("ertuway-cart", JSON.stringify(storedItems));
    refreshCartFromLocalStorage();
  };

  const handleDecrement = (productID) => {
    if (!dataFetched) return;

    let storedItems = getLocalStorageCart();
    if (storedItems.length) {
      storedItems = storedItems.map((eachItem) => {
        if (eachItem.id != productID) return eachItem;
        if (parseInt(eachItem.count) <= 1) return;
        return { ...eachItem, count: parseInt(eachItem.count) - 1 };
      });
    }
    localStorage.setItem("ertuway-cart", JSON.stringify(storedItems));
    refreshCartFromLocalStorage();
  };

  const handlePaymentButton = () => {
    if (!dataFetched) return;
    if (processing) return;
    if (!productsInCart.length) return;

    if (authData == 0) {
      router.push("/login");
    } else if (authData.username) {
      router.push("/checkout");
    }
  };

  if (dataFetched) {
    return (
      <div className={styles.CartPageContainer}>
        <div className={styles.titleBar}>
          {productsInCart.length ? `My Cart` : `Cart is empty..`}
        </div>
        <div className={styles.CartArea}>
          <div className={styles.CartList}>
            {productsInCart.length
              ? productsInCart.map((eachItem) => {
                  return (
                    <div className={styles.productContainer} key={eachItem.id}>
                      <Image
                        className={styles.productImg}
                        src={eachItem.imgLarge}
                        width={130}
                        height={130}
                        alt={eachItem.name}
                      />
                      <div className={styles.productInfoArea}>
                        <div className={styles.productName}>
                          {eachItem.brand} {eachItem.name}
                        </div>
                        <div className={styles.deliveryDate}>
                          {`Estimated Delivery: ${addDays(
                            currentDate,
                            parseInt(
                              eachItem.sellers[eachItem.selected_seller]
                                .storeShipping
                            )
                          )
                            .getDate()
                            .toString()} ${monthNames[
                            addDays(
                              currentDate,
                              parseInt(
                                eachItem.sellers[eachItem.selected_seller]
                                  .storeShipping
                              )
                            ).getMonth()
                          ].toString()} ${addDays(
                            currentDate,
                            parseInt(
                              eachItem.sellers[eachItem.selected_seller]
                                .storeShipping
                            )
                          ).getFullYear()} `}
                        </div>
                        <div className={styles.productPrice}>{`$${priceFormat(
                          calcPrice(
                            eachItem.sellers[eachItem.selected_seller]
                              .storePrice,
                            [...eachItem.options],
                            [...eachItem.selected_options]
                          ) * parseInt(eachItem.selected_count)
                        )}`}</div>
                        <div className={styles.soldBy}>
                          Sold By{" "}
                          <b>
                            {
                              eachItem.sellers[eachItem.selected_seller]
                                .storeName
                            }
                          </b>
                        </div>
                      </div>

                      <div className={styles.countArea}>
                        <div
                          className={styles.plusButton}
                          onClick={() => handleIncrement(eachItem.id)}
                        >
                          <PlusIcon />
                        </div>
                        <div className={styles.productCount}>
                          {eachItem.selected_count}
                        </div>
                        <div
                          className={styles.minusButton}
                          onClick={() => handleDecrement(eachItem.id)}
                        >
                          <MinusIcon />
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className={styles.PaymentArea}>
            <div className={styles.paymentTitle}>Total Price</div>
            <div className={styles.totalPrice}>
              ${sumPrice > 0 ? `${priceFormat(sumPrice + 10)}` : `0.00`}
            </div>
            <div className={styles.priceDetails}>
              {sumPrice > 0 && `$10,00 Shipping Costs`}
            </div>
            <div className={styles.priceDetails}>
              {sumPrice > 0 && `$${priceFormat(sumPrice)} Product Costs`}
            </div>
            <Button
              className={styles.paymentButton}
              onClick={handlePaymentButton}
            >
              {processing ? <SpinIcon className={styles.spinner} /> : ""}
              {processing ? `Processing..` : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.CartPageContainer}>
        <div className={styles.titleBar}>
          <div className={styles.titleSkeletonFill} />
        </div>
        <div className={styles.CartArea}>
          <div className={styles.CartList}>
            <div className={styles.CartItemSkeleton} />
            <div className={styles.CartItemSkeleton} />
            <div className={styles.CartItemSkeleton} />
            <div className={styles.CartItemSkeleton} />
            <div className={styles.CartItemSkeleton} />
          </div>
          <div className={`${styles.PaymentArea} ${styles.paymentSkeleton}`} />
        </div>
      </div>
    );
  }
}

export default CartPage;
