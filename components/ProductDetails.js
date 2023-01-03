import styles from "../styles/ProductDetails.module.css";
import img1 from "../public/images/details1.png";
import img2 from "../public/images/details2.png";
import img3 from "../public/images/details3.png";
import img4 from "../public/images/details4.png";
import storeicon from "../public/images/storeicon.png";
import StarIcon from "../components/Icons/StarIcon";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import priceFormat from "../Helpers/priceFormat";
import Button from "./Button";
import CartIcon from "../components/Icons/CartIcon";
import { useRouter } from "next/router";
import Image from "next/image";

function ProductDetails(props) {
  const router = useRouter();
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0, 0]);
  const letterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let customerNameLetters = [];
  var currentDate = new Date();
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

  function randLetter() {
    return letterList[Math.floor(Math.random() * letterList.length)];
  }

  function randFloat(min, max, decimals) {
    return (Math.random() * (max - min) + min).toFixed(decimals);
  }

  for (let i = 0; i < 10; i++) {
    customerNameLetters.push({ first: randLetter(), last: randLetter() });
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const dateList = Array(10)
    .fill(1)
    .map((x, i) => {
      return addDays(currentDate, (i + 1) * -4);
    });

  useEffect(() => {
    //We are calculating the bar fill widths in a way that it makes sense
    let widths = [];
    for (let i = 5; i > 0; i--) {
      let dist = Math.abs(props.product.rating - i);
      let y = 5.7143 * Math.pow(dist, 2) + -46.8571 * dist + 97.4286;
      widths.push(y);
    }
    setBarWidths([...widths]);
  }, [props.product]);

  if (props.myPage == 1) {
    return (
      <div className={styles.detailsContainer}>
        <div className={`${styles.detailsTitle} ${styles.fullRow}`}>
          {props.product.brand} {props.product.name}
        </div>
        <div className={styles.fullRow}>
          {props.product.brand} {props.product.name} is brought to you by
          Ertuway and is originally sold by{" "}
          {props.product &&
            props.product.sellers &&
            props.product.sellers[props.seller].storeName}
          . The maximum quantity of the product allowed in the shopping cart is
          two. The price of this product is determined by the seller, although
          Ertuway has the right to change the price and sale percentage at any
          time. This product is allowed to be sold by multiple sellers. The
          price and the delivery time of the same product may vary depending on
          the seller. Please be aware that this product is not a real life
          product. This is a demo eCommerce Marketplace application and does not
          sell any real products.
        </div>
        <div className={`${styles.fullRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img1} width={100} height={100} alt="" />
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>Secure Shopping</div>
            <p>
              Shopping at Ertuway is more secure than shopping in real life. Our
              industry-standart payment processing system ensures your
              information is perfectly safe and encrypted. Over 100.000 happy
              customers has bought millions of products so far at Ertuway. We
              care about your privacy and ensure the highest level of security
              when it comes to sensitive information. We are 100% compliant with
              GDPR laws. At any time, you can ask for a deletion of your
              account, your address and other sensitive information permanently.
              We do not share your information with any 3rd parties for any
              reason without your knowledge and consent. We do not track your
              shopping activity in any means. Ertuway respects your privacy
              security. Ertuway uses SSL security certification to ensure
              maximum level of encryption. Your payment information is only used
              during purchase processes. Our Network, Information Technologies,
              Business Intelligence and Help Desk deparments are driven with the
              principle of Customer Security First. Please be aware that this
              paragraph is an example text. In reality, Ertuway does not sell
              any real products, does not use or store any payment information
              at all. This is a demo eCommerce Marketplace application created
              with the purpose of demonstrating Ertuğrul&#39;s web development
              skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow} ${styles.reverseRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img2} width={100} height={100} alt="" />
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>Careful Packaging</div>
            <p>
              Our business partners are compliant with the packaging rules
              Ertuway enforces. Depending the size, substance and contents of
              each product, the packaging rules and standarts vary. Before any
              product is shipped, our business partners are required to upload
              an imaeg of your product with necessary details to demonstrate the
              packaging comply with our rules. If you notice any defects, signs
              of damage on the packaging as you receive your product, please
              contact our customer service as soon as possible. Products
              containing sensitive electronics and is susceptible static
              electricity or radio waves are required to be covered with
              protective material suitable for the application. Products that
              are susceptible to UV/IR light is required to be covered with
              proctective material capable of blocking UV/IR light completely.
              Please be aware that this paragraph is an example text. In
              reality, Ertuway does not sell any real products, does not use or
              store any payment information at all. This is a demo eCommerce
              Marketplace application created with the purpose of demonstrating
              Ertuğrul&#39;s web development skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img3} width={100} height={100} alt="" />
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>Fast Delivery</div>
            <p>
              Ertuway has partnered with the best shipping companies worldwide
              to make sure your package is delivered on time. Based on your
              location, Ertuway provides an estimation of delivery time that is
              proved to be very accurate. Ertuway and its business partners make
              sure your product is shipped and delivered on time. Any packages
              that are lost in transit are fully refunded by the seller. The
              maximum delivery time for any product is 15 business days.
              Purchases containing products that are not deliverable in 15
              business days are cancelled by the seller or Ertuway teams to set
              correct expectations. Ertuway monitors the shipping and delivery
              processes closesly with a dedicated team of members as well as
              providing you with a live delivery status in My Orders Page.
              Ertuway may send you SMS/Mail notifications about the delivery
              status. Please be aware that this paragraph is an example text. In
              reality, Ertuway does not sell any real products, does not use or
              store any payment information at all. This is a demo eCommerce
              Marketplace application created with the purpose of demonstrating
              Ertuğrul&#39;s web development skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow} ${styles.reverseRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img4} width={100} height={100} alt="" />
          </div>
          <div className={styles.column}>
            <div className={styles.columnTitle}>Best Customer Support</div>
            <p>
              In Ertuway, customer satisfaction is number one priority. Our
              customer Support is available 7/24 via phone, chat and Whatsapp
              internationally. Our customer support specialists are highly
              trained to assist you with account, purchasing, payment, shipping,
              delivery processes. In Ertuway customer support, we are natural
              problem solvers. We combined the most advanced technologies with
              the best specialists to deliver solutions. Our support team works
              closely with our business partners including the sellers and the
              delivery teams. Most cases are resolved within 24 hours of
              reaching us. Phone support operates from 9AM to 6PM in Europe,
              Middle East, Africa, North America, Central America, South
              America, Asia and Pacific countries in local timezones. Our chat
              support is available in 32 languages. Whatsapp support is
              available in only English. If you are in a different timezone or
              country and you do not speak the language of your local support,
              please contact the phone support and chat support teams within the
              timezone of locations speaking the language.Please be aware that
              this paragraph is an example text. In reality, Ertuway does not
              sell any real products, does not use or store any payment
              information at all. This is a demo eCommerce Marketplace
              application created with the purpose of demonstrating
              Ertuğrul&#39;s web development skills.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (props.myPage == 2) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.RatingContainer}>
          <Image
            className={styles.reviewImg}
            src={props.product.imgLarge}
            width={200}
            height={200}
            alt=""
          />
          <div className={styles.ratingArea}>
            <div className={styles.ratingTitle}>
              {props.product.brand} {props.product.name}
            </div>
            <div className={styles.barRow}>
              <StarIcon className={styles.barStar} />
              <b>5</b>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: barWidths[0] + "%",
                  }}
                />
              </div>
            </div>
            <div className={styles.barRow}>
              <StarIcon className={styles.barStar} />
              <b>4</b>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: barWidths[1] + "%",
                  }}
                />
              </div>
            </div>
            <div className={styles.barRow}>
              <StarIcon className={styles.barStar} />
              <b>3</b>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: barWidths[2] + "%",
                  }}
                />
              </div>
            </div>
            <div className={styles.barRow}>
              <StarIcon className={styles.barStar} />
              <b>2</b>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: barWidths[3] + "%",
                  }}
                />
              </div>
            </div>
            <div className={styles.barRow}>
              <StarIcon className={styles.barStar} />
              <b>1</b>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: barWidths[4] + "%",
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.scoreArea}>
            <div className={styles.largeScore}>
              {props.product &&
                props.product.rating &&
                parseFloat(props.product.rating).toFixed(1)}
            </div>
            <StarRating
              className={styles.starRatings}
              rating={props.product.rating}
            />
            <div className={styles.reviewCount}>
              {Math.floor(props.product.soldCount * 0.25)} Reviews
            </div>
          </div>
        </div>

        <div className={styles.customerReviewsContainer}>
          {Array(10)
            .fill(1)
            .map((x, index) => {
              return (
                <div className={styles.commentContainer} key={index}>
                  <div className={styles.customerInfo}>
                    <div className={styles.profileCircle}>
                      {customerNameLetters[index].first}{" "}
                      {customerNameLetters[index].last}
                    </div>
                    <div className={styles.customerName}>
                      {customerNameLetters[index].first}****{" "}
                      {customerNameLetters[index].last}****
                    </div>
                  </div>
                  <div className={styles.commentArea}>
                    <StarRating rating={4.8} />
                    <div className={styles.commentText}>
                      Lorem ipsum dolor sit amet consectetur. Magna fermentum et
                      adipiscing id. Suscipit sit fermentum libero consequat
                      volutpat dignissim. Cras neque egestas consequat pretium
                      interdum in. Euismod massa diam urna enim id. Amet
                      sagittis vestibulum elit sed. Maecenas sed malesuada eros
                      lacus. Turpis eget amet porttitor amet urna sit molestie
                      lobortis. Sit consequat ultrices aliquet nibh tempus.
                    </div>
                    <div className={styles.purchaseDetails}>
                      {`Purchased on   ${dateList[index]
                        .getDate()
                        .toString()} ${monthNames[
                        dateList[index].getMonth()
                      ].toString()} ${dateList[index].getFullYear()} `}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else if (props.myPage == 3) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.termsContainer}>
          <h2>How can I ask for a refund?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Condimentum euismod duis
            morbi et leo elit facilisis eleifend ornare. Vel quis sed at
            tincidunt imperdiet amet. Proin eu nisl nunc lobortis consequat
            elementum maecenas. Mollis mi quam massa id. Ornare suspendisse eget
            et blandit pulvinar congue duis in. Feugiat in at nunc ut enim proin
            duis massa. Dolor nullam venenatis sagittis morbi sed justo feugiat
            aliquet ornare. Sed sed scelerisque risus suspendisse urna feugiat
            felis bibendum. Nibh nam tempus in non blandit. Ac fames etiam duis
            ullamcorper.Fermentum sit sit eget velit aliquet eget mi lectus. In
            consequat aliquam facilisis aliquam odio sit risus integer sed. A
            sit nec viverra laoreet. Aliquam sagittis ultricies dignissim
            sollicitudin viverra sagittis bibendum. Turpis posuere habitasse
            purus sit eros lectus. Non nisi etiam egestas massa. Quis vitae
            convallis id bibendum ornare lacus fermentum. Egestas lectus
            convallis lacus mattis. In tortor porttitor a bibendum amet feugiat
            porttitor amet in.
          </p>
          <h2>How can I check the status of my refund request?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Condimentum euismod duis
            morbi et leo elit facilisis eleifend ornare. Vel quis sed at
            tincidunt imperdiet amet. Proin eu nisl nunc lobortis consequat
            elementum maecenas. Mollis mi quam massa id. Ornare suspendisse eget
            et blandit pulvinar congue duis in. Feugiat in at nunc ut enim proin
            duis massa. Dolor nullam venenatis sagittis morbi sed justo feugiat
            aliquet ornare. Sed sed scelerisque risus suspendisse urna feugiat
            felis bibendum. Nibh nam tempus in non blandit. Ac fames etiam duis
            ullamcorper.Fermentum sit sit eget velit aliquet eget mi lectus. In
            consequat aliquam facilisis aliquam odio sit risus integer sed. A
            sit nec viverra laoreet. Aliquam sagittis ultricies dignissim
            sollicitudin viverra sagittis bibendum. Turpis posuere habitasse
            purus sit eros lectus. Non nisi etiam egestas massa. Quis vitae
            convallis id bibendum ornare lacus fermentum. Egestas lectus
            convallis lacus mattis. In tortor porttitor a bibendum amet feugiat
            porttitor amet in.
          </p>
        </div>
      </div>
    );
  } else if (props.myPage == 4) {
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.allSellersContainer}>
          {props.product &&
            props.product.sellers &&
            props.product.sellers.map((eachSeller, index) => {
              return (
                <div className={styles.sellerContainer} key={index}>
                  <div className={styles.sellerContainerInner}>
                    <div className={styles.sellerInfo}>
                      <Image
                        className={styles.storeIcon}
                        src={storeicon}
                        width={80}
                        height={80}
                        alt="Store icon"
                      />
                      <div className={styles.sellerDetails}>
                        <div className={styles.sellerName}>
                          {eachSeller.storeName}
                        </div>
                        <div className={styles.sellerRating}>
                          <StarRating
                            className={styles.sellerStars}
                            rating={eachSeller.storeRating}
                          />
                          {eachSeller.storeRating}
                        </div>
                        <div className={styles.sellerReviews}>
                          ({eachSeller.storeReviews} Store Reviews)
                        </div>
                      </div>
                    </div>

                    <div className={styles.sellerPriceArea}>
                      <span>Sells this product for : </span>
                      <div className={styles.sellerPriceLabel}>
                        ${priceFormat(eachSeller.storePrice)}
                      </div>
                      <div
                        className={`${styles.sellerSaving} ${
                          eachSeller.storePrice >
                          props.product.sellers[props.seller].storePrice
                            ? styles.worseOption
                            : styles.betterOption
                        }`}
                      >
                        {eachSeller.storePrice >
                          props.product.sellers[props.seller].storePrice &&
                        props.product.sellers[props.seller].storePrice > 0
                          ? `%${(
                              (eachSeller.storePrice /
                                props.product.sellers[props.seller].storePrice -
                                1) *
                              100
                            ).toFixed(0)} Higher Price`
                          : eachSeller.storePrice <
                              props.product.sellers[props.seller].storePrice &&
                            props.product.sellers[props.seller].storePrice >
                              0 &&
                            `Save %${(
                              (1 -
                                eachSeller.storePrice /
                                  props.product.sellers[props.seller]
                                    .storePrice) *
                              100
                            ).toFixed(0)}`}
                      </div>
                    </div>

                    <div className={styles.sellerShippingArea}>
                      <span>Estimated Shipping :</span>
                      <div className={styles.sellerShippingDate}>
                        {`
                          ${addDays(
                            currentDate,
                            parseInt(eachSeller.storeShipping)
                          )
                            .getDate()
                            .toString()}
                            
                            ${monthNames[
                              addDays(
                                currentDate,
                                parseInt(eachSeller.storeShipping)
                              ).getMonth()
                            ].toString()}
                            
                            ${addDays(
                              currentDate,
                              parseInt(eachSeller.storeShipping)
                            ).getFullYear()}
                            
                            `}
                      </div>
                      <div
                        className={`${styles.sellerSaving} ${
                          eachSeller.storeShipping >
                          props.product.sellers[props.seller].storeShipping
                            ? styles.worseOption
                            : styles.betterOption
                        }`}
                      >
                        {eachSeller.storeShipping >
                        props.product.sellers[props.seller].storeShipping
                          ? `Arrives ${
                              eachSeller.storeShipping -
                              props.product.sellers[props.seller].storeShipping
                            } Days Later`
                          : eachSeller.storeShipping <
                              props.product.sellers[props.seller]
                                .storeShipping &&
                            `Arrives ${
                              props.product.sellers[props.seller]
                                .storeShipping - eachSeller.storeShipping
                            } Days Earlier`}
                      </div>
                    </div>

                    <div className={styles.sellerAddToCartArea}>
                      <Button
                        className={styles.sellerAddtoCart}
                        onClick={() =>
                          router.push(
                            `${props.product.id}/${eachSeller.storeName}`
                          )
                        }
                      >
                        <CartIcon isEmpty={1} className={styles.cartIcon} />
                        Go To Product
                      </Button>
                    </div>
                  </div>
                  <div
                    className={styles.sellerAddToCartAreaMobile}
                    onClick={() =>
                      router.push(`${props.product.id}/${eachSeller.storeName}`)
                    }
                  >
                    <Button className={styles.sellerAddtoCart}>
                      <CartIcon isEmpty={1} className={styles.cartIcon} />
                      Go To Product
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ProductDetails;
