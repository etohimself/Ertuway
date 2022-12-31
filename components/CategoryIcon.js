import styles from "../styles/CategoryIcon.module.css";
import Image from "next/image";

function CategoryIcon(props) {
  return (
    <div
      className={`${styles.CategoryIconContainer} ${props.className} ${
        props.small == 1 && styles.small
      } `}
      onClick={props.onClick}
      style={
        props.index > props.hideAfter
          ? { visibility: "hidden", height: "0" }
          : {}
      }
    >
      <Image
        src={props.data.categoryIcon}
        alt={props.data.categoryName}
        width={80}
        height={80}
        className={styles.iconImg}
      />
      <p>{props.data.categoryName}</p>
    </div>
  );
}

export default CategoryIcon;
