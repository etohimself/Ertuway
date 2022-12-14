import { useState, useRef, useEffect } from "react";
import styles from "../styles/PriceSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
import MagnifierIcon from "./Icons/MagnifierIcon";

function PriceSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState(1000); //Something big enough to prevent shrink transition
  const contentRef = useRef();
  const handleCollapse = () => setCollapsed((prev) => !prev);
  useEffect(() => setCalculatedHeight(contentRef.current.clientHeight), []);

  //Generate Price Names from List Given in Props
  const generatePriceName = (x) => {
    if (x.max > 0) {
      return `$${x.min} - ${x.max}`;
    } else if (x.max < x.min) {
      return `$${x.min} and Above`;
    } else {
      return "All prices";
    }
  };

  const handleMinChange = (event) => {
    event.target.value > -1 && setMinRange(event.target.value);
  };

  const handleMaxChange = (event) => {
    event.target.value > -1 && setMaxRange(event.target.value);
  };

  const handleRangeInput = () => {
    props.onSelect({
      invoker: props.slicername,
      data: {
        max: parseInt(maxRange) || 0,
        min: parseInt(minRange) || 0,
      },
    });
  };

  return (
    <div className={`${styles.PriceSlicerContainer} ${props.className}`}>
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
        <div className={styles.rangeArea}>
          <input
            className={styles.rangeInput}
            placeholder="Min"
            value={minRange > 0 ? minRange : ""}
            onChange={handleMinChange}
          />
          -
          <input
            className={styles.rangeInput}
            placeholder="Max"
            value={maxRange > 0 ? maxRange : ""}
            onChange={handleMaxChange}
          />
          <div className={styles.rangeButton} onClick={handleRangeInput}>
            <MagnifierIcon />
          </div>
        </div>
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
                  props.value.min == item.min &&
                  props.value.max == item.max &&
                  styles.isSelected
                }`}
              >
                <div className={styles.circleMark} />
              </div>
              {generatePriceName(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceSlicer;
