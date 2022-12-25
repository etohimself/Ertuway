import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import styles from "../styles/CartPage.module.css";
import { ProductContext } from "../contexts/productContext";
import priceFormat from "../helpers/priceFormat";
import MinusIcon from "../components/Icons/MinusIcon";
import PlusIcon from "../components/Icons/PlusIcon";
import getLocalStorageCart from "../helpers/getLocalStorageCart.js";
import calcPrice from "../helpers/calcPrice";
import Button from "../components/Button";

function CartPage(props) {
  const { productDB } = useContext(ProductContext);
  const [sumPrice, setSumPrice] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
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

  function refreshCartFromLocalStorage() {
    let finalItems = [];
    let storedItems = getLocalStorageCart();
    storedItems = storedItems.map((eachStored) => {
      let found = 0;
      productDB.forEach((cat) =>
        cat.products.forEach((itemDB) => {
          if (itemDB.id == eachStored.id && !found) {
            found = 1;
            finalItems.push({
              ...itemDB,
              selected_seller: eachStored.seller,
              selected_options: eachStored.options,
              selected_count: eachStored.count,
            });
          }
        })
      );
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

  useEffect(() => {
    //refreshCartFromLocalStorage();
  }, []);

  const handleIncrement = (productID) => {
    let storedItems = getLocalStorageCart();
    if (storedItems.length) {
      storedItems = storedItems.map((eachItem) => {
        if (eachItem.id != productID) return eachItem;
        if (parseInt(eachItem.count) >= 3) return eachItem;
        return { ...eachItem, count: parseInt(eachItem.count) + 1 };
      });
    }
    localStorage.setItem("ertuway-cart", JSON.stringify(storedItems));
    //refreshCartFromLocalStorage();
  };

  const handleDecrement = (productID) => {
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
                          eachItem.sellers[eachItem.selected_seller].storePrice,
                          [...eachItem.options],
                          [...eachItem.selected_options]
                        ) * parseInt(eachItem.selected_count)
                      )}`}</div>
                      <div className={styles.soldBy}>
                        Sold By{" "}
                        <b>
                          {eachItem.sellers[eachItem.selected_seller].storeName}
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
            {sumPrice > 0 ? `${priceFormat(sumPrice + 20)}` : `$0.00`}
          </div>
          <div className={styles.priceDetails}>
            {sumPrice > 0 && `$20,00 Shipping Costs`}
          </div>
          <div className={styles.priceDetails}>
            {sumPrice > 0 && `$${priceFormat(sumPrice)} Product Costs`}
          </div>
          <Button className={styles.paymentButton}>Payment</Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
