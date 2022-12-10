import { useContext } from "react";
import styles from "../styles/Footer.module.css";
import { ProductContext } from "../contexts/productContext";
import InstagramIcon from "./Icons/LinkedInIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";
import FacebookIcon from "./Icons/FacebookIcon";
import ContactUsButtons from "./ContactButtons";

function Footer(props) {
  const { productDB } = useContext(ProductContext);

  return (
    <div className={styles.FooterContainer}>
      <div className={styles.InnerContainer}>
        <div className={styles.WrappingContent}>
          <b>Ertuway.com</b>
          <div className={styles.footerLink}>About Us</div>
          <div className={styles.footerLink}>Guidebook</div>
          <div className={styles.footerLink}>Contact Us</div>
          <div className={styles.footerLink}>My Account</div>
          <div className={styles.footerLink}>Customer Support</div>
          <div className={styles.footerLink}>Whatsapp Support</div>
          <div className={styles.footerLink}>Legal</div>
          <div className={styles.footerLink}>Terms and Conditions</div>
          <div className={styles.footerLink}>Career</div>
          <div className={styles.footerLink}>Sell Your Products</div>

          <b>Categories</b>
          {productDB.map((x) => (
            <div className={styles.footerLink}>{x.categoryName}</div>
          ))}
        </div>
        <div className={styles.MediaAndContactContainer}>
          <div className={styles.MediaContainer}>
            <InstagramIcon />
            <TwitterIcon />
            <FacebookIcon />
            <YoutubeIcon />
            <LinkedInIcon />
          </div>
          <div className={styles.ContactContainer}>
            <h3>Have A Question?</h3>
            <ContactUsButtons footer={1} className={styles.contactUsButtons} />
          </div>
        </div>
      </div>
      <p>© 2022-2023, Ertuway, All Rights Reserved</p>
    </div>
  );
}

export default Footer;
