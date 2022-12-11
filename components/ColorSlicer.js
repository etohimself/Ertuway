import { useState, useRef, useEffect } from "react";
import styles from "../styles/ColorSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
function ColorSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const contentRef = useRef();
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };
  const [calculatedHeight, setCalculatedHeight] = useState(1000); //Something big enough to prevent shrink transition
  const [currentSelection, setCurrentSelection] = useState(-1);
  
  const sendSelection = (selectedItem) => {
    if (currentSelection == selectedItem && props.allowEmpty == 1) {
      setCurrentSelection(-1);
      props.onSelect({
        invoker: props.slicername,
        type: 1,
        data: null,
      });
    } else {
      setCurrentSelection(selectedItem);
      props.onSelect({
        invoker: props.slicername,
        type: 1,
        data: selectedItem,
      });
    }
  };

  const calculateColor = (color) => {
    if (color == "gold")
      return {
        background:
          "linear-gradient(180deg, #D5B71B 0%, rgba(217, 217, 217, 0) 100%)",
      };
    if (color == "silver")
      return {
        background:
          "linear-gradient(180deg, #AFAFAF 0%, rgba(217, 217, 217, 0) 100%)",
      };
    if (color == "rainbow")
      return {
        background:
          "linear-gradient(90deg, #FF0000 7.14%, #F89725 23.1%, #E4F24D 39.55%, #6BEC78 51.64%, #84E8DC 62.76%, #9FAEE3 74.37%, #DDBCDE 86.94%, #FF0000 100%)",
      };
    return { background: color };
  };

  useEffect(() => {
    setCalculatedHeight(contentRef.current.clientHeight);
  }, []);

  return (
    <div className={`${styles.ColorSlicerContainer} ${props.className}`}>
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
        {props.list.map((x, i) => {
          return (
            <div
              key={i}
              className={`${styles.slicerItem} ${
                currentSelection == x && styles.isSelected
              }`}
              onClick={() => sendSelection(x)}
              style={calculateColor(x.color)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorSlicer;
