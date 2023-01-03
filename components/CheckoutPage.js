import Cookies from "js-cookie";
import styles from "../styles/CheckoutPage.module.css";
import Button from "../components/Button";
import SpinIcon from "./Icons/SpinIcon";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/authContext";
import getLocalStorageCart from "../helpers/getLocalStorageCart.js";
import getLocalStorageOrders from "../Helpers/getLocalStorageOrders.js";
import calcPrice from "../helpers/calcPrice";
import priceFormat from "../helpers/priceFormat";
import Dropdown from "./Dropdown";
import Image from "next/image";


function CheckoutPage(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [sumPrice, setSumPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [productDB, setProductDB] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  const [addressList, setAddressList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [processing, setProcessing] = useState(0);

  const [list_shipping] = useState([
    { name: "Standart Shipping", value: 0 },
    { name: "Fast Shipping", value: 1 },
  ]);

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
            selected_shipping: 0,
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

    setShippingPrice(
      finalItems.reduce(
        (acc, x) => (x.selected_shipping > 0 ? acc + 12 : acc + 5),
        0
      )
    );
  }

  useEffect(() => {
    if (!productsInCart.length) return;
    setShippingPrice(
      productsInCart.reduce(
        (acc, x) => (x.selected_shipping > 0 ? acc + 12 : acc + 5),
        0
      )
    );
  }, [productsInCart]);

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

  function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //WHEN PAGE LOADS
  useEffect(() => {
    setDataFetched(0);
    setProductDB([]);

    //Fetch products
    const fetchData = async () => {
      let myToken = Cookies.get("session-token");
      let productAPI = `${location.protocol}//${location.hostname}:27469/products`;
      let accountAPI = `${location.protocol}//${location.hostname}:27469/accountinfo?token=${myToken}`;
      let res_product = await fetch(productAPI);
      let data_product = await res_product.json();
      let res_account = await fetch(accountAPI);
      let data_account = await res_account.json();

      //Check if the data we received is valid
      if (
        data_product.length &&
        data_product[0].imgLarge &&
        data_account.addresslist
      ) {
        //If data is valid, set current product
        setProductDB(data_product);
        refreshCartFromLocalStorage(data_product); //Products given, so we dont have to wait for useState to update
        setAddressList(data_account.addresslist);
        setCardList(data_account.cardlist);
        setDataFetched(1);
      }
    };
    fetchData();
  }, [router]);

  const handleShippingSelection = (index, data) => {
    setProductsInCart((prevData) => {
      return prevData.map((x, i) =>
        i == index ? { ...x, selected_shipping: parseInt(data.data.value) } : x
      );
    });
  };

  const handlePaymentButton = () => {
    if (processing) return;

    let orderObj = {};
    let generatedOrderNum = randNum(42431534, 98698943);
    orderObj.products = productsInCart.map((x) => {
      return {
        id: x.id,
        selected_count: x.selected_count,
        selected_seller: x.selected_seller,
        selected_options: x.selected_options,
        selected_shipping: x.selected_shipping,
      };
    });
    orderObj.payment = cardList[currentCard].id;
    orderObj.address = addressList[currentAddress].id;
    orderObj.user = authData.username;
    orderObj.orderNumber = generatedOrderNum;
    orderObj.orderDateTime = Date.now();

    localStorage.removeItem("ertuway-cart");
    let storedOrders = getLocalStorageOrders();
    storedOrders = [...storedOrders, orderObj];
    localStorage.setItem("ertuway-orders", JSON.stringify(storedOrders));
    setProcessing(1);
    router.push(`/order/${generatedOrderNum}`);
  };

  if (authData == 0) {
    router.push("/login");
  } else if (authData.username && dataFetched) {
    if (productsInCart.length) {
      return (
        <div className={styles.CheckoutPageContainer}>
          <div className={styles.CartArea}>
            <div className={styles.cartLeftArea}>
              <div className={styles.DeliveryAddressArea}>
                <div className={styles.DeliveryTitle}>Delivery Address : </div>
                <div className={styles.DeliveryList}>
                  {addressList.map((x, i) => (
                    <div
                      key={i}
                      className={`${styles.AddressBox} ${
                        currentAddress == i && styles.selected
                      }`}
                      onClick={() => setCurrentAddress(i)}
                    >
                      <div className={styles.AddressBoxTitle}>{x.title}</div>
                      <div>{x.address}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.CreditCardArea}>
                <div className={styles.DeliveryTitle}>Payment Method : </div>
                <div className={styles.DeliveryList}>
                  {cardList.map((x, i) => (
                    <div
                      key={i}
                      className={`${styles.CreditcardBox} ${
                        currentCard == i && styles.selected
                      }`}
                      onClick={() => setCurrentCard(i)}
                    >
                      <div className={styles.cardChip} />
                      <div className={styles.cardNumber}>{x.cardnumber}</div>
                      <div className={styles.cardRow}>
                        <div className={styles.cardName}>{x.cardholder}</div>
                        <Image
                          width={48}
                          height={30}
                          className={styles.cardIcon}
                          src={`/images/cards/${x.type}.svg`}
                          alt="Card Type Icon"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.PaymentArea}>
              <div className={styles.paymentTitle}>Total Price</div>
              <div className={styles.totalPrice}>
                $
                {sumPrice > 0
                  ? `${priceFormat(sumPrice + shippingPrice)}`
                  : `0.00`}
              </div>
              <div className={styles.priceDetails}>
                {sumPrice > 0 &&
                  `$${priceFormat(shippingPrice)} Shipping Costs`}
              </div>
              <div className={styles.priceDetails}>
                {sumPrice > 0 && `$${priceFormat(sumPrice)} Product Costs`}
              </div>
              <Button
                className={styles.paymentButton}
                onClick={handlePaymentButton}
              >
                {processing ? <SpinIcon className={styles.spinner} /> : ""}
                {processing ? `Processing..` : "Complete Order"}
              </Button>
            </div>
          </div>
          <div className={styles.DeliveryTitle}>Products In Cart : </div>
          <div className={styles.CartList}>
            {productsInCart.length
              ? productsInCart.map((eachItem, i) => {
                  return (
                    <div className={styles.productContainer} key={eachItem.id}>
                      <div className={styles.productInner}>
                        <img
                          className={styles.productImg}
                          src={eachItem.imgLarge}
                          width={130}
                          height={130}
                          alt={eachItem.name}
                        />
                        <div className={styles.productInfoArea}>
                          <div className={styles.productName}>
                            {eachItem.selected_count}x {eachItem.brand}{" "}
                            {eachItem.name}
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
                        </div>
                      </div>
                      <div className={styles.shippingArea}>
                        <Dropdown
                          list={list_shipping}
                          value={{ value: eachItem.selected_shipping }}
                          onSelect={(data) => handleShippingSelection(i, data)}
                          className={styles.shippingDropdown}
                        />
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
                    </div>
                  );
                })
              : ""}
          </div>
          <div className={`${styles.PaymentArea} ${styles.mobile}`}>
            <div className={styles.paymentTitle}>Total Price</div>
            <div className={styles.totalPrice}>
              $
              {sumPrice > 0
                ? `${priceFormat(sumPrice + shippingPrice)}`
                : `0.00`}
            </div>
            <div className={styles.priceDetails}>
              {sumPrice > 0 && `$${priceFormat(shippingPrice)} Shipping Costs`}
            </div>
            <div className={styles.priceDetails}>
              {sumPrice > 0 && `$${priceFormat(sumPrice)} Product Costs`}
            </div>
            <Button
              className={styles.paymentButton}
              onClick={handlePaymentButton}
            >
              Complete Order
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.CheckoutPageContainer}>
          <h1>Please wait...</h1>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.CheckoutPageContainer}>
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

export default CheckoutPage;
