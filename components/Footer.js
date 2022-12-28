import styles from "../styles/Footer.module.css";
import InstagramIcon from "./Icons/LinkedInIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";
import FacebookIcon from "./Icons/FacebookIcon";
import ContactUsButtons from "./ContactButtons";
import { useState, useEffect } from "react";

function Footer(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [subCategories, setSubCategories] = useState([]);

  //WHEN PAGE LOADS OR ROUTE CHANGES
  useEffect(() => {
    setDataFetched(0);
    setSubCategories([]);

    const fetchData = async () => {
      let categoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories`;
      let res_subcategories = await fetch(categoryAPI);
      let data_subcategories = await res_subcategories.json();

      //Check if the data we received is valid
      if (data_subcategories.length && data_subcategories[0].shortname) {
        //send data to filter context so it prepares the slicers
        setSubCategories(data_subcategories);
        setDataFetched(1);
      }
    };
    fetchData();
  }, []);

  if (dataFetched)
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
            {subCategories.map((x, i) => (
              <div key={i} className={styles.footerLink}>
                {x.categoryName}
              </div>
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
              <ContactUsButtons
                footer={1}
                className={styles.contactUsButtons}
              />
            </div>
          </div>
        </div>
        <p>© 2022-2024, Ertuway, All Rights Reserved</p>
      </div>
    );
}

export default Footer;
