import styles from "../styles/SeeAllButton.module.css";
import ArrowIcon from "./Icons/ArrowIcon";

function SeeAllButton(props) {
  return (
    <div className={styles.seeAllBtn}>
      See All
      <ArrowIcon className={styles.seeAllArrow} />
    </div>
  );
}

export default SeeAllButton;
