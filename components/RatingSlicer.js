import { useState, useRef, useEffect } from "react";
import styles from "../styles/RatingSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
import StarIcon from "./Icons/StarIcon";

function RatingSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const [currentSelection, setCurrentSelection] = useState(props.value);
  const [calculatedHeight, setCalculatedHeight] = useState(1000); //Something big enough to prevent shrink transition
  const contentRef = useRef();
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    setCalculatedHeight(1000);
    setTimeout(() => {
      setCalculatedHeight(contentRef.current.clientHeight);
    }, 600);
  }, [props.list]);

  return (
    <div className={`${styles.RatingSlicerContainer} ${props.className}`}>
      <div className={styles.titleBar}>
        <h1>{props.title}</h1>
        <ArrowIcon
          className={`${styles.collapseButton} ${
            collapsed && styles.collapsed
          }`}
          onClick={handleCollapse}
        />
      </div>
      <div
        className={`${styles.contentArea}`}
        style={{ maxHeight: collapsed ? 0 : calculatedHeight }}
        ref={contentRef}
      >
        {props.list.map((item, index) => {
          return (
            <div
              className={styles.slicerItem}
              key={index}
              onClick={() =>
                props.onSelect({ invoker: props.slicername, data: item })
              }
            >
              <div
                className={`${styles.selectionCircle} ${
                  props.value.stars == item.stars && styles.isSelected
                }`}
              >
                <div className={styles.circleMark} />
              </div>
              <div className={styles.textAndStars}>
                <div className={styles.starContainer}>
                  <StarIcon empty={item.stars < 1} />
                  <StarIcon empty={item.stars < 2} />
                  <StarIcon empty={item.stars < 3} />
                  <StarIcon empty={item.stars < 4} />
                  <StarIcon empty={item.stars < 5} />
                </div>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingSlicer;
