import Cookies from "js-cookie";
import styles from "../styles/SuccessPage.module.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/authContext";
import getLocalStorageOrders from "../Helpers/getLocalStorageOrders.js";
import calcPrice from "../helpers/calcPrice";
import priceFormat from "../helpers/priceFormat";
import Image from "next/image";

function SuccessPage(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const router = useRouter();
  const { authData } = useContext(AuthContext);

  function capFirst(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }

  const parseOrderNum = (xOrder) => {
    return `${xOrder.toString().substr(0, 3)} ${xOrder
      .toString()
      .substr(3, 3)} ${xOrder.toString().substr(6, 2)}`;
  };

  function refreshOrderFromLocalStorage(
    productsGiven,
    addressesGiven,
    cardsGiven,
    orderNumber
  ) {
    let finalItems = [];
    let storedItems = getLocalStorageOrders();
    if (!productsGiven || !productsGiven.length) return;
    if (!storedItems || !storedItems.length || !storedItems[0].orderNumber)
      return;
    let foundOrder = storedItems.filter(
      (eachOrder) => eachOrder.orderNumber == orderNumber
    );
    if (
      !foundOrder.length ||
      !foundOrder[0].products ||
      !foundOrder[0].products.length
    )
      return;
    storedItems = foundOrder[0].products.map((eachStored) => {
      let found = 0;
      productsGiven.forEach((itemDB) => {
        if (itemDB.id == eachStored.id && !found) {
          found = 1;
          finalItems.push({
            ...itemDB,
            selected_seller: eachStored.selected_seller,
            selected_options: eachStored.selected_options,
            selected_count: eachStored.selected_count,
            selected_shipping: eachStored.selected_shipping,
          });
        }
      });
    });
    setOrderedProducts(finalItems);

    let foundAddress = addressesGiven.filter(
      (x) => x.id == foundOrder[0].address
    );
    let foundCard = cardsGiven.filter((x) => x.id == foundOrder[0].payment);
    setCurrentAddress(foundAddress.length ? foundAddress[0] : "");
    setCurrentCard(foundCard.length ? foundCard[0] : "");
    setCurrentOrderNumber(orderNumber);
  }

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

  //WHEN PAGE LOADS
  useEffect(() => {
    setDataFetched(0);

    //Fetch products
    const fetchData = async () => {
      let secondParam = "";
      setDataFetched(0);
      setOrderedProducts([]);
      //Wait until router object is ready
      if (!router.isReady) return;
      //Check for valid category
      if (router.query && router.query.routes && router.query.routes.length) {
        secondParam = router.query.routes[0];
      }

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
        refreshOrderFromLocalStorage(
          data_product,
          data_account.addresslist,
          data_account.cardlist,
          secondParam
        ); //Products given, so we dont have to wait for useState to update
        setDataFetched(1);
      }
    };
    fetchData();
  }, [router]);

  if (authData == 0) {
    router.push("/login");
  } else if (authData.username && dataFetched) {
    if (orderedProducts.length) {
      return (
        <div className={styles.SuccessPageContainer}>
          <div className={styles.SuccessArea}>
            <div className={styles.titleBar}>Thank you for your order!</div>
            <div>
              We got your order. Soon, your items will be prepared and shipped.
              Delivery time may differ depending on the shipping method and the
              seller for each item. Please take a note of the order number
              below. You can check the status of your cargo using your order
              number or by signing in. Thank you for choosing Ertuway!
            </div>
            <div className={styles.deliveryDetails}>
              <div className={styles.deliveryInfoBox}>
                <div className={styles.deliveryInfoTitle}>
                  Delivery Address:
                </div>
                <div>{currentAddress.address}</div>
              </div>
              <div className={styles.deliveryInfoBox}>
                <div className={styles.deliveryInfoTitle}>Payment Info:</div>
                <div className={styles.deliveryCardInfo}>
                  <div className={styles.CreditcardBox}>
                    <div className={styles.cardChip} />
                    <div className={styles.cardNumber}>
                      {currentCard.cardNumber}
                    </div>
                    <div className={styles.cardRow}>
                      <div className={styles.cardName}>
                        {currentCard.cardholder}
                      </div>
                      <Image
                        width={36}
                        height={24}
                        className={styles.cardIcon}
                        src={`/images/cards/${currentCard.type}.svg`}
                        alt="Card Type Icon"
                      />
                    </div>
                  </div>
                  <div
                    className={styles.deliveryCardText}
                  >{`Paid via ${capFirst(currentCard.type)} Card ${
                    currentCard.cardnumber
                  }, Cardholder : ${currentCard.cardholder}`}</div>
                </div>
              </div>
              <div className={styles.deliveryInfoBox}>
                <div className={styles.deliveryInfoTitle}>Order Number:</div>
                <div className={styles.orderNumber}>
                  {parseOrderNum(currentOrderNumber)}
                </div>
              </div>
            </div>
            <div className={styles.cartList}>
              <div className={styles.itemsTitle}>Ordered Items : </div>
              {orderedProducts.map((eachItem) => {
                return (
                  <div className={styles.productContainer} key={eachItem.id}>
                    <div className={styles.productInner}>
                      <Image
                        className={styles.productImg}
                        src={eachItem.imgLarge}
                        width={130}
                        height={130}
                        alt={eachItem.name}
                      />
                      <div className={styles.productAreaRow}>
                        <div className={styles.productInfoArea}>
                          <div className={styles.productName}>
                            {eachItem.brand} {eachItem.name}
                          </div>
                          <div>
                            Purchased from{" "}
                            <b>
                              {
                                eachItem.sellers[eachItem.selected_seller]
                                  .storeName
                              }
                            </b>
                          </div>
                          <div className={styles.productPrice}>{`$${priceFormat(
                            calcPrice(
                              eachItem.sellers[eachItem.selected_seller]
                                .storePrice,
                              [...eachItem.options],
                              [...eachItem.selected_options]
                            ) * parseInt(eachItem.selected_count)
                          )}`}</div>
                          {eachItem.selected_count} Piece
                          {eachItem.selected_count > 1 ? "s" : ""}
                        </div>
                        <div className={styles.statusArea}>
                          <div className={styles.statusTitle}>Order Status</div>
                          <div className={styles.orderStatusText}>
                            Your items will be soon shipped by the seller.
                          </div>
                        </div>
                        <div className={styles.statusArea}>
                          <div className={styles.statusTitle}>
                            {eachItem.selected_shipping > 0
                              ? "Fast Delivery"
                              : "Standart Delivery"}
                          </div>
                          <div className={styles.deliveryDate}>
                            Estimated Delivery: <br />
                            <b>
                              {`${addDays(
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
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      router.push("/");
      return <h2>Invalid Order, Redirecting..</h2>;
    }
  } else {
    return (
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessAreaSkeleton}></div>
      </div>
    );
  }
}

export default SuccessPage;
