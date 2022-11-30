import BrandIcon from "./Icons/BrandIcon";
import styles from "../styles/BrandLogo.module.css";

function BrandLogo(props) {
  return (
    <div className={styles.brandContainer}>
      <BrandIcon className={styles.brandLogoIcon} />
      Ertuway
    </div>
  );
}

export default BrandLogo;
