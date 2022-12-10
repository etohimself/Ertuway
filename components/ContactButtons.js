import styles from "../styles/ContactButtons.module.css";
import WhatsappIcon from "./Icons/WhatsappIcon";

function ContactButtons(props) {
  return (
    <div
      className={`${styles.ContactButtonsContainer} ${props.className} ${
        props.footer && styles.footer
      }`}
    >
      <div className={styles.contactButton}>Customer Support</div>
      <div className={styles.orContainer}>
        <div className={styles.lineDiv} />
        OR
        <div className={styles.lineDiv} />
      </div>
      <div className={styles.WhatsappContainer}>
        <WhatsappIcon className={styles.wpIcon} />
        Whatsapp Support
      </div>
      <h2>+90 (538) 570 9786</h2>
    </div>
  );
}

export default ContactButtons;
