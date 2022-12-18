import { useContext, useEffect, useState } from "react";
import styles from "../styles/ProductPage.module.css";
import { ProductContext } from "../contexts/productContext";
import Image from "next/image";
import StarRating from "../components/StarRating";
import priceFormat from "../helpers/priceFormat";
import OptionSelector from "./OptionSelector";

function ProductPage(props) {
  const { currentProduct } = useContext(ProductContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
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

    if (selectedOptions.length && selectedOptions.length > 0) {
      selectedOptions.forEach((eachValue, index) => {
        if (currentProduct.options[index].affectsPrice == 1) {
          basePrice += eachValue * (basePrice * 0.1);
        } else if (currentProduct.options[index].affectsPrice == 2) {
          basePrice += eachValue * (basePrice * 0.7);
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
              Seller : <span>{currentProduct.brand}</span>
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
          </div>
        </div>
      </div>
    );
  } else {
    <h1>Loading...</h1>;
  }
}

export default ProductPage;
