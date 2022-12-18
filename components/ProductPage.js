import { useContext, useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import { ProductContext } from "../contexts/productContext";
import Image from "next/image";
import StarRating from "../components/StarRating";
import priceFormat from "../helpers/priceFormat";
import OptionSelector from "./OptionSelector";
import Button from "./Button";
import CartIcon from "../components/Icons/CartIcon";
import HeartIcon from "../components/Icons/HeartIcon";
import FastDelivery from "../components/Icons/FastDeliveryIcon";
import PeopleAlsoViewed from "../components/PeopleAlsoViewed";

function ProductPage(props) {
  const { currentProduct } = useContext(ProductContext);
  const [selectedOptions, setSelectedOptions] = useState(Array(25).fill(0));
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (currentProduct.options && currentProduct.options.length) {
      setSelectedOptions(Array(currentProduct.options.length).fill(0));
    }
  }, [currentProduct]);

  const handleOptionSelection = (slicerIndex, selectedIndex) => {
    setSelectedOptions(
      selectedOptions.map((x, i) => (i == slicerIndex ? selectedIndex : x))
    );
  };

  useEffect(() => {
    let basePrice = currentProduct.price ? currentProduct.price : 0;
    if (
      currentProduct.options &&
      currentProduct.options.length &&
      currentProduct.options.length > 0
    ) {
      currentProduct.options.forEach((eachOption, index) => {
        if (eachOption.affectsPrice == 1) {
          basePrice += selectedOptions[index] * (basePrice * 0.1);
        } else if (eachOption.affectsPrice == 2) {
          basePrice += selectedOptions[index] * (basePrice * 0.7);
        }
      });
    }
    setPrice(basePrice);
  }, [currentProduct, selectedOptions]);

  if (currentProduct.imgLarge) {
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
              Seller : <span>{currentProduct.sellers[0]}</span>
            </div>
            <div className={styles.priceLabel}>$ {priceFormat(price)}</div>
            {currentProduct.options && currentProduct.options.length
              ? currentProduct.options.map((eachOption, index) => {
                  return (
                    <OptionSelector
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
              <Button>
                <CartIcon isEmpty={1} className={styles.cartIcon} />
                Add To Cart
              </Button>
              <Button secondary={1}>
                <HeartIcon className={styles.wishlistIcon} />
                Add To Wishlist
              </Button>
            </div>
            <div className={styles.estimatedShipping}>
              Estimated Shipping : Shipped in 3 Days
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
                  The only purpose of this app is to demonstrate Ertuğrul's web
                  developer skills.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <PeopleAlsoViewed subcategory={currentProduct.subcategory} />
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
