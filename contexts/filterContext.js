import { createContext, useEffect, useState, useContext } from "react";
import { ProductContext } from "./productContext";

export const FilterContext = createContext();

export function FilterProvider(props) {
  const { productDB } = useContext(ProductContext);

  const [filter_subcategory, set_filter_subcategory] = useState("all");
  const [filter_maincategory, set_filter_maincategory] = useState("all");
  const [filter_price, set_filter_price] = useState({ min: 0, max: 0 });
  const [filter_color, set_filter_color] = useState({ color: "all" });
  const [filter_rating, set_filter_rating] = useState({ stars: -1 });
  const [filter_warranty, set_filter_warranty] = useState({ value: 0 });
  const [filter_sortby, set_filter_sortby] = useState({ value: 0 });
  const [list_subcategory, set_list_subcategory] = useState([
    { name: "", shortname: "" },
  ]);

  const [list_price] = useState([
    { min: 0, max: 10 },
    { min: 10, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 250 },
    { min: 250, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 0 },
  ]);

  const [list_color] = useState([
    { color: "white" },
    { color: "black" },
    { color: "gray" },
    { color: "silver" },
    { color: "gold" },
    { color: "red" },
    { color: "orange" },
    { color: "yellow" },
    { color: "green" },
    { color: "cyan" },
    { color: "blue" },
    { color: "purple" },
    { color: "violet" },
    { color: "pink" },
    { color: "rainbow" },
  ]);

  const [list_rating] = useState([
    { name: "5 Stars Reviews", stars: 5 },
    { name: "4 Stars Reviews", stars: 4 },
    { name: "3 Stars Reviews", stars: 3 },
    { name: "2 Stars Reviews", stars: 2 },
    { name: "1 Star Reviews", stars: 1 },
  ]);

  const [list_warranty] = useState([
    { name: "All Warranty", value: 0 },
    { name: "2 Years Warranty", value: 2 },
    { name: "1 Year of Warranty", value: 1 },
  ]);

  const [list_sortby] = useState([
    { name: "Recommended Order", value: 0 },
    { name: "Highest to Lowest Price", value: 1 },
    { name: "Lowest to Highest Price", value: 2 },
    { name: "Most Sold Products", value: 3 },
    { name: "Most Viewed Products", value: 4 },
  ]);

  const updateFilters = (payload) => {
    //Handle Category Slicer Data
    if (payload.invoker == "category_slicer") {
      if (filter_subcategory == payload.data.shortname) {
        //Remove selection
        set_filter_subcategory("all");
      } else {
        set_filter_subcategory(payload.data.shortname);
      }
    }
    //Handle Price Slicer Data
    else if (payload.invoker == "price_slicer") {
      if (
        filter_price.min == payload.data.min &&
        filter_price.max == payload.data.max &&
        payload.data.min + payload.data.max > 0
      ) {
        //Remove selection
        set_filter_price({ min: 0, max: 0 });
      } else {
        set_filter_price({
          min: payload.data.min,
          max: payload.data.max >= payload.data.min ? payload.data.max : 0,
        });
      }
    } else if (payload.invoker == "color_slicer") {
      if (filter_color.color == payload.data.color) {
        //Remove Selection
        set_filter_color("all");
      } else {
        set_filter_color({ color: payload.data.color });
      }
    } else if (payload.invoker == "rating_slicer") {
      if (filter_rating.stars == payload.data.stars) {
        //Remove Selection
        set_filter_rating({ stars: -1 });
      } else {
        set_filter_rating({ stars: payload.data.stars });
      }
    } else if (payload.invoker == "warranty_slicer") {
      if (filter_warranty.value == payload.data.value) {
        //Remove Selection
        set_filter_warranty({ value: 0 });
      } else {
        set_filter_warranty({ value: payload.data.value });
      }
    } else if (payload.invoker == "order_slicer") {
      if (filter_sortby.value == payload.data.value) {
        //Remove Selection
        set_filter_sortby({ value: 0 });
      } else {
        set_filter_sortby({ value: payload.data.value });
      }
    }
  };

  useEffect(() => {
    console.log("######## Main Category Changed to be " + filter_maincategory + " ########")
    let subcategoryList = [];
    for (let i = 0; i < productDB.length; i++) {
      if (productDB[i].maincategory == filter_maincategory) {
        subcategoryList.push({
          name: productDB[i].categoryName,
          shortname: productDB[i].shortname,
        });
      }
    }
    console.log(subcategoryList);
    set_list_subcategory(subcategoryList);
  }, [filter_maincategory]);

  return (
    <FilterContext.Provider
      value={{
        list_subcategory,
        list_price,
        list_color,
        list_rating,
        list_warranty,
        list_sortby,

        filter_maincategory,
        filter_subcategory,
        filter_price,
        filter_color,
        filter_rating,
        filter_warranty,
        filter_sortby,

        updateFilters,
        set_filter_maincategory,
        set_filter_subcategory,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}
