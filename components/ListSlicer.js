import { useState, useRef, useEffect } from "react";
import styles from "../styles/ListSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
function ListSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const contentRef = useRef();
  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };
  const [calculatedHeight, setCalculatedHeight] = useState(1000); //Something big enough to prevent shrink transition

  const sendSelection = (selectedItem) => {
    props.onSelect({ invoker: props.slicername, type: 1, data: selectedItem });
  };

  useEffect(() => {
    setCalculatedHeight(contentRef.current.clientHeight);
  }, []);

  return (
    <div className={`${styles.ListSlicerContainer} ${props.className}`}>
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
            <p
              key={i}
              className={styles.slicerItem}
              onClick={() => sendSelection(x)}
            >
              {x.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default ListSlicer;
