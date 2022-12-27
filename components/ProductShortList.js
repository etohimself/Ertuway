import styles from "../styles/ProductShortList.module.css";
import ProductItem from "./ProductItem";
import SeeAllButton from "./SeeAllButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProductShortList(props) {
  const router = useRouter();
  const [itemList, setItemList] = useState([]);
  const [redirectRoute, setRedirectRoute] = useState("");
  const [dataFetched, setDataFetched] = useState(0);

  useEffect(() => {
    if (!props.sortBy) return;
    let api_extension = "";
    let route_redirect = "/";

    //Build the redirect route
    if (props.maincategory) {
      //If there is a maincategory, this shortlist is within best pages
      route_redirect = route_redirect + "category/" + props.maincategory + "/";
      if (props.sortBy == "viewCount")
        route_redirect = route_redirect + "mostviewed";
      if (props.sortBy == "soldCount")
        route_redirect = route_redirect + "bestsellers";
      if (props.sortBy == "salePercentage")
        route_redirect = route_redirect + "bestdeals";
    } else {
      //otherwise we are inside index page
      if (props.sortBy == "viewCount") route_redirect = "mostviewed";
      if (props.sortBy == "soldCount") route_redirect = "bestsellers";
      if (props.sortBy == "salePercentage") route_redirect = "bestdeals";
    }
    setRedirectRoute(route_redirect);

    //Build the API extension
    if (props.sortBy == "viewCount") api_extension = "mostviewed";
    if (props.sortBy == "soldCount") api_extension = "bestsellers";
    if (props.sortBy == "salePercentage") api_extension = "bestdeals";

    if (api_extension == "") return;
    let productsAPI = `${location.protocol}//${location.hostname}:27469/${api_extension}`;
    if (props.maincategory)
      productsAPI = `${productsAPI}?maincategory=${props.maincategory}`;

    fetch(productsAPI)
      .then((res) => res.json())
      .then((data) => {
        setItemList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (itemList.length && itemList[0].id) {
      //data is valid
      setDataFetched(1);
    }
  }, [itemList]);

  if (!dataFetched) {
    return (
      <div className={styles.productShortListContainer}>
        <div className={styles.titleBar}>
          <h1>{props.title}</h1>
          <SeeAllButton />
        </div>
        <div className={styles.itemArea}>
          {Array(8)
            .fill(0)
            .map((x, i) => {
              return <div className={styles.productSkeleton} key={i} />;
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.productShortListContainer}>
        <div className={styles.titleBar}>
          <h1>{props.title}</h1>
          <SeeAllButton onClick={() => router.push(redirectRoute)} />
        </div>
        <div className={styles.itemArea}>
          {itemList.map((x, i) => {
            return (
              <ProductItem
                data={x}
                key={x.id}
                noLeftMargin={i == 0}
                noRightMargin={i == itemList.length - 1}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductShortList;
