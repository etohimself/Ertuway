import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/MobileCategories.module.css";
import CancelIcon from "./Icons/CancelIcon";

function MobileCategories() {
  const [dataFetched, setDataFetched] = useState(0);
  const [pageList, setPageList] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setDataFetched(0);
    //Fetch main and subcategories
    const fetchData = async () => {
      let pagelistAPI = `${location.protocol}//${location.hostname}:27469/pagelist`;
      let maincategoryAPI = `${location.protocol}//${location.hostname}:27469/maincategories`;
      let subcategoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories`;

      let res_maincategories = await fetch(maincategoryAPI);
      let data_maincategories = await res_maincategories.json();
      let res_subcategories = await fetch(subcategoryAPI);
      let data_subcategories = await res_subcategories.json();
      let res_pagelist = await fetch(pagelistAPI);
      let data_pagelist = await res_pagelist.json();

      //Check if the data we received is valid
      if (
        data_subcategories.length &&
        data_subcategories[0].shortname &&
        data_maincategories.length &&
        data_pagelist.length &&
        data_pagelist[0].title
      ) {
        setSubCategories(data_subcategories);
        setMainCategories(data_maincategories);
        setPageList(data_pagelist);
        setDataFetched(1);
      }
    };
    fetchData();
  }, []);

  if (dataFetched)
    return (
      <div className={styles.menuContainer}>
        <div className={`${styles.menuButton} ${styles.menuTitle}`}>
          <p>Categories</p>
          <CancelIcon className={styles.menuCloseBtn} />
        </div>
      </div>
    );
}

export default MobileCategories;
