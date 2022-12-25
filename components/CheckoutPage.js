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

function CheckoutPage(props) {
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
  }

  return (
    <div className={styles.CheckoutPageContainer}>
      <h1>Checkout Page Alive!</h1>
    </div>
  );
}

export default CheckoutPage;
