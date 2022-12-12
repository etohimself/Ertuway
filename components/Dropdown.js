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

  const handleSelection = (selectedIndex) => {
    props.onSelect(selectedIndex);
    handleClick();
  };

  useEffect(() => {
    setCalculatedHeight(listRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`${styles.dropdownContainer} ${props.className}`}
      style={props.style}
    >
      <div className={styles.selectedContainer} onClick={handleClick}>
        {props.list[props.selected]}
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
          {props.list.map((x, i) => {
            return (
              <div
                className={styles.listItem}
                key={i}
                onClick={() => handleSelection(i)}
              >
                {x}
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
