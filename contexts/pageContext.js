import { createContext } from "react";

export const PageContext = createContext();

export function PageProvider(props) {
  const eventList = [
    { event: "momsday", title: "Mom's Day Special Sale" },
    { event: "saturdaysale", title: "Saturday Electronics Sale" },
  ];

  const pageList = [
    { title: "Home", shortname: "index", isMainCategory: 0 },
    { title: "Best Deals", shortname: "bestdeals", isMainCategory: 0 },
    { title: "Best Sellers", shortname: "bestsellers", isMainCategory: 0 },
    { title: "Electronics", shortname: "electronics", isMainCategory: 1 },
    { title: "Fashion", shortname: "fashion", isMainCategory: 1 },
    { title: "Health & Beauty", shortname: "health", isMainCategory: 1 },
    { title: "Home & Garden", shortname: "home", isMainCategory: 1 },
    { title: "Automotive", shortname: "car", isMainCategory: 1 },
    { title: "Consumables", shortname: "consumable", isMainCategory: 1 },
    { title: "Supermarket", shortname: "supermarket", isMainCategory: 1 },
    { title: "Hobby & Art", shortname: "hobby", isMainCategory: 1 },
  ];

  return (
    <PageContext.Provider
      value={{
        eventList,
        pageList,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
}
