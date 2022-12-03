import ArrowIcon from "./Icons/ArrowIcon";
import styles from "../styles/ScrollArrow.module.css";

function ScrollArrow(props) {
  return (
    /* prettier-ignore */
    <div 
    className={`${styles.arrowContainer} ${props.direction == "right" && styles.rightArrow} ${props.className && props.className}`}
    style={props.backgroundColor && {backgroundColor:props.backgroundColor}}
    onClick={props.onClick} 
    >
      <ArrowIcon 
      className={styles.arrowIcon}
      style={props.arrowColor && {fill:props.arrowColor}}
      />
    </div>
  );
}

export default ScrollArrow;
