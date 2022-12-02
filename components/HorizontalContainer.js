import styles from "../styles/HorizontalContainer.module.css";
import ArrowIcon from "../components/Icons/ArrowIcon";
import { useRef } from "react";

function HorizontalContainer(props) {
  const scrollAreaDOM = useRef();

  function decideScrollAmount() {
    let width = scrollAreaDOM.current.offsetWidth; //Get current scroll width
    let compStyle = window.getComputedStyle(scrollAreaDOM.current.children[0]);
    let itemWidth =
      scrollAreaDOM.current.children[0].offsetWidth +
      parseInt(compStyle.getPropertyValue("margin-right")) +
      parseInt(compStyle.getPropertyValue("margin-left"));
    return width - (width % itemWidth);
    //Perfect scroll amount!
  }

  return (
    <div className={styles.HorizontalContainer}>
      <div
        className={`${styles.arrowContainer} ${styles.leftArrow}`}
        onClick={() =>
          (scrollAreaDOM.current.scrollLeft -= decideScrollAmount())
        }
      >
        <ArrowIcon className={styles.arrowIcon} />
      </div>

      <div className={styles.scrollArea} ref={scrollAreaDOM}>
        {props.children}
      </div>

      <div
        className={`${styles.arrowContainer} ${styles.rightArrow}`}
        onClick={() =>
          (scrollAreaDOM.current.scrollLeft += decideScrollAmount())
        }
      >
        <ArrowIcon className={styles.arrowIcon} />
      </div>
    </div>
  );
}

export default HorizontalContainer;
