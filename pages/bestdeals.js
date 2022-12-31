import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import ProductShortList from "../components/ProductShortList";
import { AuthProvider } from "../contexts/authContext";
import MobileMenu from "../components/MobileMenu.js";
import { useState, useEffect } from "react";

export default function BestDeals() {
  const [dataFetched, setDataFetched] = useState(0);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    let pagelistAPI = `${location.protocol}//${location.hostname}:27469/pagelist`;
    fetch(pagelistAPI)
      .then((res) => res.json())
      .then((data) => {
        if (data.length && data[0].title) {
          setPageList(data);
          setDataFetched(1);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return dataFetched ? (
    <>
      <AuthProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="bestdeals" />
            <MobileMenu />
            {pageList.map((eachPage) => {
              if (eachPage.isMainCategory)
                return (
                  <ProductShortList
                    title={`Best Deals ${eachPage.title}`}
                    sortBy="salePercentage"
                    maincategory={eachPage.shortname}
                    key={eachPage.shortname}
                  />
                );
            })}
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </AuthProvider>
    </>
  ) : (
    ""
  );
}
