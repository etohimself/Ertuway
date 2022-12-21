import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import styles from "../styles/CartPage.module.css";
import { ProductContext } from "../contexts/productContext";
import priceFormat from "../helpers/priceFormat";
import MinusIcon from "../components/Icons/MinusIcon";
import PlusIcon from "../components/Icons/PlusIcon";

function CartPage(props) {
  const { productDB } = useContext(ProductContext);
  const [productsInCart, setProductsInCart] = useState([
    {
      id: "7038e143-830f-4ed9-8f12-c75b317751b7",
      subcategory: "consumable_school",
      seller: "OracleStore",
      selectedOptions: [],
      count: 2,
    },
    {
      id: "149d095a-311e-41cf-9794-90171fbb4dfd",
      subcategory: "electronics_computer",
      seller: "FastShop",
      selectedOptions: [0, 2, 1],
      count: 1,
    },
    {
      id: "26310cdd-9fdb-4f08-a168-ec130e235ba3",
      subcategory: "electronics_camera",
      seller: "PhotoMerch",
      selectedOptions: [2],
      count: 1,
    },
  ]);
  const [productsToRender, setProductsToRender] = useState([]);
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

  useEffect(() => {
    let bufferList = [];
    productsInCart.forEach((eachItem) => {
      let foundCat = productDB.filter(
        (cat) => cat.shortname == eachItem.subcategory
      );
      if (
        foundCat &&
        foundCat.length &&
        foundCat[0].products &&
        foundCat[0].products.length
      ) {
        //Valid category
        let foundItem = foundCat[0].products.filter(
          (eachProduct) => eachProduct.id == eachItem.id
        );
        if (foundItem && foundItem.length) {
          //Valid product
          bufferList.push({ ...foundItem[0], count: eachItem.count });
        }
      }
    });
    setProductsToRender(bufferList);
  }, [productDB, productsInCart]);

  const handleIncrement = (productID) => {
    //I must actually update it in local storage, or database if I decide to use it
    setProductsInCart((prev) => {
      return prev.map((x) =>
        x.id == productID
          ? { ...x, count: x.count + 1 <= 3 ? x.count + 1 : 3 }
          : x
      );
    });
  };

  const handleDecrement = (productID) => {
    //I must actually update it in local storage, or database if I decide to use it
    setProductsInCart((prev) => {
      return prev.map((x) =>
        x.id == productID ? x.count - 1 > 0 && { ...x, count: x.count - 1 } : x
      );
    });
  };

  return (
    <div className={styles.CartPageContainer}>
      <div className={styles.titleBar}>My Cart</div>
      <div className={styles.CartArea}>
        <div className={styles.CartList}>
          {productsToRender.map((eachItem, index) => {
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
                    {`Estimated Delivery : ${addDays(currentDate, 5)
                      .getDate()
                      .toString()} ${monthNames[
                      addDays(currentDate, 5).getMonth()
                    ].toString()} ${addDays(currentDate, 5).getFullYear()} `}
                  </div>
                  <div className={styles.productPrice}>{`$${priceFormat(
                    eachItem.price
                  )}`}</div>
                </div>
                <div className={styles.soldBy}>
                  Sold By <b>{eachItem.sellers[0]}</b>
                </div>
                <div className={styles.countArea}>
                  <div
                    className={styles.plusButton}
                    onClick={() => handleIncrement(eachItem.id)}
                  >
                    <PlusIcon />
                  </div>
                  <div className={styles.productCount}>{eachItem.count}</div>
                  <div
                    className={styles.minusButton}
                    onClick={() => handleDecrement(eachItem.id)}
                  >
                    <MinusIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.PaymentArea}></div>
      </div>
    </div>
  );
}

export default CartPage;
