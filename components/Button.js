import styles from "../styles/Button.module.css";

function Button(props) {
  return (
    <div
      className={`${props.className} ${styles.ButtonContainer} ${
        props.secondary && styles.secondary
      }`}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
    >
      {props.children}
    </div>
  );
}

export default Button;
