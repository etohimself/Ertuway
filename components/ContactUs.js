import styles from "../styles/ContactUs.module.css";
import ContactButtons from "./ContactButtons.js";

function ContactUs(props) {
  return (
    <div className={styles.ContactUsContainer}>
      <h1>Ertuway</h1>
      <p>
        Ertuway is a demo eCommerce Marketplace App designed to demonstrate
        Ertugrul Core's web design & development skills. This website does not
        sell any real products or services. Prices and products displayed are
        imaginary. No payments are allowed. We do not store any personal
        information, address or billing information.
      </p>
      <ContactButtons className={styles.contactUsArea} />
    </div>
  );
}

export default ContactUs;
