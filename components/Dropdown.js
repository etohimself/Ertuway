import styles from "../styles/Dropdown.module.css";
import ArrowIcon from "./Icons/ArrowIcon";
import { useState, useRef, useEffect } from "react";

function Dropdown(props) {
  const [collapsed, setCollapsed] = useState(1);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  const listRef = useRef();

  const handleClick = () => {
    setCollapsed((prevData) => {
      return !prevData;
    });
  };

  useEffect(() => {
    setCalculatedHeight(listRef.current.scrollHeight);
  }, []);

  const handleSelection = (item) => {
    props.onSelect({ invoker: props.slicername, data: item });
    setCollapsed(1);
  };

  return (
    <div
      className={`${styles.dropdownContainer} ${props.className}`}
      style={props.style}
    >
      <div className={styles.selectedContainer} onClick={handleClick}>
        {props.list.filter((x) => x.value == props.value.value)[0].name}
        <ArrowIcon
          className={`${styles.collapseButton} ${collapsed || styles.showList}`}
        />
      </div>

      <div
        className={styles.listWrapper}
        ref={listRef}
        style={{
          maxHeight: collapsed ? 0 : calculatedHeight + 1, //for bottom padding
        }}
      >
        <div
          className={`${styles.listContainer} ${collapsed || styles.showList}`}
        >
          {props.list.map((item, index) => {
            return (
              <div
                className={styles.listItem}
                key={index}
                onClick={() => handleSelection(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;

/*
<Dropdown list=["Recommended Order", ...]>

*/
