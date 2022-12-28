import styles from "../styles/ExploreCategories.module.css";
import { useState, useEffect } from "react";
import CategoryIcon from "./CategoryIcon";
import { useRouter } from "next/router";

function ExploreCategories(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [dataFetched, setDataFetched] = useState(0);
  const router = useRouter();

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

  if (dataFetched) {
    return (
      <div className={styles.ExploreCategoriesContainer}>
        <h1>Explore Categories</h1>
        <div className={styles.iconList}>
          {categoryList.map((category, index) => (
            <CategoryIcon
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
