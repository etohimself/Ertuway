import styles from "../styles/PageContent.module.css";

function PageContent(props) {
  return (
    <div className={styles.PageContentContainer}>
      {props.children}
    </div>
  );
}

export default PageContent;
