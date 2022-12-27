import styles from "../styles/DiscountCategories.module.css";
import HorizontalContainer from "../components/HorizontalContainer.js";
import SaleCategory from "../components/SaleCategory.js";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { useRouter } from "next/router";

function DiscountCategories(props) {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(0);
  const [eventList, setEventList] = useState([]);

  function handleSubcategoryClick(maincategory, subcategory) {
    if (!dataFetched) return;
    router.push(
      "/category/" +
        maincategory +
        "/" +
        subcategory.split(maincategory + "_")[1]
    );
  }

  //Fetch discount events and subcategories belonging to those events
  useEffect(() => {
    const fetchEventData = async () => {
      let eventlistAPI = `${location.protocol}//${location.hostname}:27469/eventcategories`;
      let res_event = await fetch(eventlistAPI);
      let data_event = await res_event.json();
      setEventList(data_event);
    };
    fetchEventData();
  }, []);

  //If data is valid, set the flag
  useEffect(() => {
    if (eventList.length && eventList[0].event && eventList[0].subcategories) {
      setDataFetched(1);
    }
  }, [eventList]);

  if (dataFetched) {
    return (
      <>
        {eventList.map((eachEvent, i) => {
          return (
            <div className={styles.discountCategoryContainer} key={i}>
              <div className={styles.titleBar}>
                <h1 className={styles.discountCategoryTitle}>
                  {eachEvent.event.title}
                </h1>
              </div>
              <HorizontalContainer>
                {eachEvent.subcategories.map((x, i) => {
                  return (
                    <SaleCategory
                      title={x.categoryName}
                      image={x.categoryImg}
                      discount={x.maxSale}
                      key={i + "_" + x.shortname}
                      onClick={() =>
                        handleSubcategoryClick(x.maincategory, x.shortname)
                      }
                    />
                  );
                })}
              </HorizontalContainer>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <div className={styles.discountCategoryContainer}>
        <HorizontalContainer>
          {Array(8)
            .fill(0)
            .map((x, i) => (
              <div className={styles.categorySkeleton} key={i} />
            ))}
        </HorizontalContainer>
      </div>
    );
  }
}

export default DiscountCategories;
