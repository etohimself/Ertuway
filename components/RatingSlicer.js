import { useState, useRef, useEffect } from "react";
import styles from "../styles/RatingSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
import StarIcon from "./Icons/StarIcon";

function RatingSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const [currentSelection, setCurrentSelection] = useState(
    props.allowEmpty == 0 ? 0 : -1
  );
  const [calculatedHeight, setCalculatedHeight] = useState(1000); //Something big enough to prevent shrink transition
  const contentRef = useRef();
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const sendSelection = (selectedIndex) => {
    if (currentSelection == selectedIndex) {
      setCurrentSelection(-1);
      props.onSelect({
        invoker: props.slicername,
        type: 1,
        data: 0,
      });
    } else {
      setCurrentSelection(selectedIndex);
      props.onSelect({
        invoker: props.slicername,
        type: 1,
        data: props.list[selectedIndex],
      });
    }
  };

  useEffect(() => {
    setCalculatedHeight(contentRef.current.clientHeight);
  }, []);

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
              onClick={() => sendSelection(index)}
              key={index}
            >
              <div
                className={`${styles.selectionCircle} ${
                  currentSelection == index && styles.isSelected
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
