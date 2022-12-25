import styles from "../styles/SearchBox.module.css";
import MagnifierIcon from "./Icons/MagnifierIcon";
import SpinIcon from "./Icons/SpinIcon";

function SearchBox(props) {
  return (
    <div
      className={`${styles.SearchBoxContainer} ${
        props.loading && styles.loading
      }`}
    >
      <input
        type="text"
        className={styles.SearchInput}
        placeholder={props.loading ? "" : "Product, category or brand..."}
        disabled={props.loading}
      />
      {props.loading ? (
        <SpinIcon className={styles.spinner} />
      ) : (
        <MagnifierIcon className={styles.magnifierIcon} />
      )}
    </div>
  );
}

export default SearchBox;
