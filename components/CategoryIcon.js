import styles from "../styles/CategoryIcon.module.css";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import Image from "next/image";

function CategoryIcon(props) {
  const { productDB } = useContext(ProductContext);
  const myCategory = productDB.filter((cat) => cat.shortname == props.name)[0];

  return (
    <div
      className={`${styles.CategoryIconContainer} ${
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
        src={myCategory.categoryIcon}
        alt={myCategory.categoryName}
        width={80}
        height={80}
        className={styles.iconImg}
      />
      <p>{myCategory.categoryName}</p>
    </div>
  );
}

export default CategoryIcon;
