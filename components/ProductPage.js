import { useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import Image from "next/image";
import StarRating from "../components/StarRating";
import priceFormat from "../Helpers/priceFormat";
import OptionSelector from "./OptionSelector";
import Button from "./Button";
import CartIcon from "../components/Icons/CartIcon";
import HeartIcon from "../components/Icons/HeartIcon";
import FastDelivery from "../components/Icons/FastDeliveryIcon";
import PeopleAlsoViewed from "../components/PeopleAlsoViewed";
import ProductDescription from "./ProductDescription";
import GetLocalStorageCart from "../Helpers/getLocalStorageCart.js";
import calcPrice from "../Helpers/calcPrice.js";
import { useRouter } from "next/router";

function ProductPage(props) {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(0);
  const [currentProduct, setCurrentProduct] = useState();
  const [currentSellerIndex, setCurrentSellerIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(25).fill(0));
  const [price, setPrice] = useState(0);
  const [addedToCart, setAddedToCart] = useState(0);

  //WHEN PAGE LOADS OR ROUTE CHANGES
  useEffect(() => {
    let route_productid = "";
    let route_seller = "";

    //Show lazy loading regardless
    setDataFetched(0);
    setCurrentProduct();
    setCurrentSellerIndex(0);
    setSelectedOptions(Array(25).fill(0));

    //Wait until router object is ready
    if (!router.isReady) return;

    //Check for valid category

    if (router.query && router.query.routes && router.query.routes.length) {
      route_productid = router.query.routes[0];
      if (router.query.routes.length > 1) {
        route_seller = router.query.routes[1];
      }
    }

    //Fetch products and subcategories
    const fetchData = async () => {
      let productAPI = `${location.protocol}//${location.hostname}:27469/products?id=${route_productid}`;
      let res_product = await fetch(productAPI);
      let data_product = await res_product.json();

      //Check if the data we received is valid
      if (data_product.length && data_product[0].imgLarge) {
        //If data is valid, set current product
        setCurrentProduct(data_product[0]);
        //If there is a valid seller name is second route param, set current seller index
        let foundSeller = data_product[0].sellers.findIndex(
          (x) => x.storeName == route_seller
        );

        if (foundSeller > -1) {
          //If there is a seller store name specified, set current seller and calculate the initial price accordingly
          setCurrentSellerIndex(foundSeller);
          setPrice(data_product[0].sellers[foundSeller].storePrice);
        } else {
          //Otherwise show the default price which is the first store's price
          setPrice(data_product[0].sellers[0].storePrice);
        }
        //Lets raise the data fetched flag
        setDataFetched(1);
      }
    };
    fetchData();
  }, [router]);

  const handleOptionSelection = (slicerIndex, selectedIndex) => {
    setSelectedOptions(
      selectedOptions.map((x, i) => (i == slicerIndex ? selectedIndex : x))
    );
  };

  useEffect(() => {
    if (!dataFetched) return;

    let storedItems = GetLocalStorageCart();
    if (storedItems.findIndex((x) => x.id == currentProduct.id) > -1) {
      setAddedToCart(1);
    } else {
      setAddedToCart(0);
    }
  }, [currentProduct, currentSellerIndex]);

  const handleAddToCart = () => {
    let storedItems = GetLocalStorageCart();
    if (storedItems.findIndex((x) => x.id == currentProduct.id) == -1) {
      let myOrder = {
        id: currentProduct.id,
        seller: currentSellerIndex,
        options: [...selectedOptions],
        count: 1,
      };
      storedItems.push(myOrder);
      localStorage.setItem("ertuway-cart", JSON.stringify(storedItems));
      setAddedToCart(1);
    } else {
      storedItems = storedItems.filter(
        (eachItem) => eachItem.id != currentProduct.id
      );
      localStorage.setItem("ertuway-cart", JSON.stringify(storedItems));
      setAddedToCart(0);
    }
  };

  useEffect(() => {
    if (!dataFetched) return;
    if (!currentProduct) return;
    if (!currentProduct.sellers) return;
    setPrice(
      calcPrice(
        currentProduct.sellers[currentSellerIndex].storePrice,
        [...currentProduct.options],
        [...selectedOptions]
      )
    );
  }, [currentProduct, selectedOptions, currentSellerIndex]);

  if (dataFetched) {
    return (
      <div className={styles.ProductPageContainer}>
        <div className={styles.ProductWelcomer}>
          <div className={styles.mobileTitleArea}>
            <div className={styles.ProductTitle}>
              {currentProduct.brand} {currentProduct.name}
            </div>
            <div className={styles.ratingAndReviewContainer}>
              <StarRating rating={currentProduct.rating} />
              {`${Math.floor(currentProduct.soldCount * 0.25)}`} Reviews
            </div>
          </div>
          <Image
            className={styles.ProductImageContainer}
            width={578}
            height={608}
            src={currentProduct.imgLarge}
            alt={`${currentProduct.brand} ${currentProduct.name}`}
          />
          <div className={styles.ProductInfoContainer}>
            <div className={styles.largeTitleArea}>
              <div className={styles.ProductTitle}>
                {currentProduct.brand} {currentProduct.name}
              </div>
              <div className={styles.ratingAndReviewContainer}>
                <StarRating rating={currentProduct.rating} />
                {`${Math.floor(currentProduct.soldCount * 0.25)}`} Reviews
              </div>
            </div>
            <div className={styles.sellerNameContainer}>
              Seller :{" "}
              <span>
                {currentProduct.sellers[currentSellerIndex].storeName}
              </span>
            </div>
            <div className={styles.priceLabel}>$ {priceFormat(price)}</div>
            {currentProduct.options && currentProduct.options.length
              ? currentProduct.options.map((eachOption, index) => {
                  return (
                    <OptionSelector
                      key={index}
                      title={eachOption.name}
                      index={index}
                      list={[...eachOption.values]}
                      value={selectedOptions[index]}
                      isColor={eachOption.name == "Color"}
                      onChange={handleOptionSelection}
                    />
                  );
                })
              : ""}
            <div className={styles.fastDelivery}>
              <FastDelivery className={styles.deliveryIcon} />
              Fast Delivery Available
            </div>
            <div className={styles.buttonsArea}>
              {addedToCart == 0 ? (
                <Button onClick={handleAddToCart}>
                  <CartIcon isEmpty={1} className={styles.cartIcon} />
                  Add To Cart
                </Button>
              ) : (
                <Button secondary={1} onClick={handleAddToCart}>
                  <CartIcon isEmpty={1} className={styles.cartIcon} />
                  Remove from Cart
                </Button>
              )}
              <Button secondary={1}>
                <HeartIcon className={styles.wishlistIcon} />
                Add To Wishlist
              </Button>
            </div>
            <div className={styles.estimatedShipping}>
              Estimated Shipping : Shipped in{" "}
              {currentProduct.sellers[currentSellerIndex].storeShipping} Days
            </div>
            <div className={styles.demoAlert}>
              <ul>
                <li>
                  Ertuway is a demo eCommerce Marketplace app built by Ertuğrul
                  CÖRE.
                </li>
                <li>
                  This website does not sell any real products by any means.
                </li>
                <li>
                  Your address or credit card information is not stored on this
                  website.
                </li>
                <li>
                  The only purpose of this app is to demonstrate Ertuğrul&#39;s
                  web developer skills.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <PeopleAlsoViewed subcategory={currentProduct.subcategory} />

        <ProductDescription
          product={currentProduct}
          seller={currentSellerIndex}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.ProductPageContainer}>
        <div className={styles.ProductWelcomer}>
          <div
            className={`${styles.mobileTitleArea} ${styles.lazyPlaceHolder}`}
          />
          <div
            className={`${styles.ProductImageContainer} ${styles.lazyPlaceHolder}`}
          />
          <div className={`${styles.ProductInfoContainer}`}>
            <div
              className={`${styles.largeTitleArea} ${styles.lazyPlaceHolder}`}
            />
            <div
              className={`${styles.skeletonDetails} ${styles.middle} ${styles.lazyPlaceHolder}`}
            />
            <div
              className={`${styles.skeletonDetails} ${styles.middle} ${styles.lazyPlaceHolder}`}
            />
            <div
              className={`${styles.skeletonDetails} ${styles.short} ${styles.lazyPlaceHolder}`}
            />
            <div className={styles.skeletonButtons}>
              <div
                className={`${styles.skeletonDetails} ${styles.button} ${styles.lazyPlaceHolder}`}
              />
              <div
                className={`${styles.skeletonDetails} ${styles.button} ${styles.lazyPlaceHolder}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
