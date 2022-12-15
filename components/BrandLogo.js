import BrandIcon from "./Icons/BrandIcon";
import styles from "../styles/BrandLogo.module.css";
import { useRouter } from "next/router";

function BrandLogo(props) {
  const router = useRouter();

  function handleClick() {
    router.push("/");
  }

  return (
    <div className={styles.brandContainer} onClick={handleClick}>
      <BrandIcon className={styles.brandLogoIcon} />
      {props.text}
    </div>
  );
}

export default BrandLogo;
