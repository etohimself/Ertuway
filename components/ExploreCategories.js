import styles from "../styles/ExploreCategories.module.css";
import { useState, useEffect, useRef } from "react";
import CategoryIcon from "./CategoryIcon";
import { useRouter } from "next/router";
import useElementWidth from "../components/hooks/useElementWidth";

function ExploreCategories(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [dataFetched, setDataFetched] = useState(0);
  const router = useRouter();
  const containerRef = useRef(0);
  const [parentWidth, childWidth] = useElementWidth(containerRef);
  const [hideAfter, setHideAfter] = useState(100);

  function handleSubcategoryClick(maincategory, subcategory) {
    router.push(
      "/category/" +
        maincategory +
        "/" +
        subcategory.split(maincategory + "_")[1]
    );
  }

  useEffect(() => {
    let categoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories`;
    fetch(categoryAPI)
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (categoryList.length && categoryList[0].shortname) {
      //data is valid
      setDataFetched(1);
    }
  }, [categoryList]);

  useEffect(() => {
    //When the width changes, quickly calculate which ones to hide
    if (!childWidth || !categoryList.length) {
      setHideAfter(100);
      return;
    }
    let rowCapacity = (parentWidth - (parentWidth % childWidth)) / childWidth;
    setHideAfter(categoryList.length - (categoryList.length % rowCapacity));
  }, [parentWidth, childWidth]);

  if (dataFetched) {
    return (
      <div className={styles.ExploreCategoriesContainer}>
        <h1>Explore Categories</h1>
        <div className={styles.iconList} ref={containerRef}>
          {categoryList.map((category, index) => (
            <CategoryIcon
              className={`${index >= hideAfter && styles.noDraw}`}
              data={category}
              index={index + 1}
              key={category.shortname}
              onClick={() =>
                handleSubcategoryClick(
                  category.maincategory,
                  category.shortname
                )
              }
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.ExploreCategoriesContainer}>
        <h1>Explore Categories</h1>
        <div className={styles.iconList}>
          {Array(50)
            .fill(0)
            .map((x, i) => {
              return <div className={styles.exploreSkeleton} key={i} />;
            })}
        </div>
      </div>
    );
  }
}

export default ExploreCategories;
