import styles from "../styles/HorizontalContainer.module.css";
import ScrollArrow from "./ScrollArrow";

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
      <ScrollArrow
        onClick={() =>
          (scrollAreaDOM.current.scrollLeft -= decideScrollAmount())
        }
        className={styles.leftArrow}
      />

      <div className={styles.scrollArea} ref={scrollAreaDOM}>
        {props.children}
      </div>

      <ScrollArrow
        direction="right"
        onClick={() =>
          (scrollAreaDOM.current.scrollLeft += decideScrollAmount())
        }
        className={styles.rightArrow}
      />
    </div>
  );
}

export default HorizontalContainer;