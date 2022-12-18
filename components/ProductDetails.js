import Image from "next/image";
import styles from "../styles/ProductDetails.module.css";
import img1 from "../public/images/details1.png";
import img2 from "../public/images/details2.png";
import img3 from "../public/images/details3.png";
import img4 from "../public/images/details4.png";

function ProductDetails(props) {
  if (props.myPage == 1) {
    return (
      <div className={styles.detailsContainer}>
        <div className={`${styles.detailsTitle} ${styles.fullRow}`}>
          {props.product.brand} {props.product.name}
        </div>
        <div className={styles.fullRow}>
          {props.product.brand} {props.product.name} is brought to you by
          Ertuway and is originally sold by {props.product.sellers[0]}. The
          maximum quantity of the product allowed in the shopping cart is two.
          The price of this product is determined by the seller, although
          Ertuway has the right to change the price and sale percentage at any
          time. This product is allowed to be sold by multiple sellers. The
          price and the delivery time of the same product may vary depending on
          the seller. Please be aware that this product is not a real life
          product. This is a demo eCommerce Marketplace application and does not
          sell any real products.
        </div>
        <div className={`${styles.fullRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img1} />
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
              with the purpose of demonstrating Ertuğrul's web development
              skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow} ${styles.reverseRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img2} />
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
              Ertuğrul's web development skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img3} />
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
              Ertuğrul's web development skills.
            </p>
          </div>
        </div>
        <div className={`${styles.fullRow} ${styles.reverseRow}`}>
          <div className={styles.column}>
            <Image className={styles.detailsImg} src={img4} />
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
              application created with the purpose of demonstrating Ertuğrul's
              web development skills.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (props.myPage == 2) {
    return <h1>Reviews Page</h1>;
  } else if (props.myPage == 3) {
    return <h1>Terms Page</h1>;
  } else if (props.myPage == 4) {
    return <h1>All Sellers Page</h1>;
  }
}

export default ProductDetails;
