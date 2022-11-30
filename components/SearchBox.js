import styles from "../styles/SearchBox.module.css";
import MagnifierIcon from "./Icons/MagnifierIcon";

function SearchBox(props) {
  return (
    <div className={styles.SearchBoxContainer}>
      <input
        type="text"
        className={styles.SearchInput}
        placeholder=" Product, category or brand..."
      />
      <MagnifierIcon className={styles.magnifierIcon} />
    </div>
  );
}

export default SearchBox;
