import styles from "../styles/OptionSelector.module.css";

function OptionSelector(props) {
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

  return (
    <div className={styles.OptionSelectorContainer}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.optionList}>
        {props.list &&
          props.list.length &&
          props.list.map((item, index) => {
            return (
              <div
                className={`${styles.optionButton} ${
                  index == props.value && styles.selected
                }`}
                onClick={() => props.onChange(props.index, index)}
              >
                <div className={styles.optionValueArea}>
                  {props.isColor == 1 ? (
                    <div
                      className={styles.colorCircle}
                      style={calculateColor(item)}
                    />
                  ) : (
                    ""
                  )}
                  <div className={styles.valueText}>{item}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OptionSelector;
