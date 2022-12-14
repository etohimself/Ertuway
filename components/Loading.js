import styles from "../styles/Loading.module.css";
import BrandLogo from "./BrandLogo";

const Loading = (props) => {
  return (
    <div className={styles.loadingContainer}>
      <BrandLogo text="Ertuway"/>
    </div>
  );
};

export default Loading;
