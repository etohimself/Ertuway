import { useState, useRef, useEffect } from "react";
import styles from "../styles/ListSlicer.module.css";
import ArrowIcon from "./Icons/ArrowIcon";

function ListSlicer(props) {
  const [collapsed, setCollapsed] = useState(0);
  const contentRef = useRef();
  const [calculatedHeight, setCalculatedHeight] = useState(1000);

  //Handle Collapse
  const handleCollapse = () => setCollapsed((prev) => !prev);
  //Calculate Full Height
  useEffect(() => {
    if (props.list && props.list.length && props.list.length > 0) {
      setCalculatedHeight(contentRef.current.clientHeight);
    }
  }, [props.list]);

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
        {props.list && props.list.length
          ? props.list.map((item, index) => {
              return (
                <p
                  key={index}
                  className={`${styles.slicerItem} ${
                    props.value == item.shortname && styles.selected
                  }`}
                  onClick={() =>
                    props.onSelect({ invoker: props.slicername, data: item })
                  }
                >
                  {item.name}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ListSlicer;
