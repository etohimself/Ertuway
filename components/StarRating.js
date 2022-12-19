import styles from "../styles/StarRating.module.css";
import StarIcon from "../components/Icons/StarIcon";

function StarRating(props) {
  const grayscaleWidth = props.rating ? (5 - props.rating) * 24 : 120;
  return (
    <div className={`${styles.starRatingContainer} ${props.className}`}>
      <StarIcon className={styles.starIcon} />
      <StarIcon className={styles.starIcon} />
      <StarIcon className={styles.starIcon} />
      <StarIcon className={styles.starIcon} />
      <StarIcon className={styles.starIcon} />
      <div className={styles.ratingFilter} style={{ width: grayscaleWidth }} />
    </div>
  );
}

export default StarRating;
