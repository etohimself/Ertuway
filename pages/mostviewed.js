import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import ProductShortList from "../components/ProductShortList";
import { PageProvider } from "../contexts/pageContext.js";
import MobileMenu from "../components/MobileMenu.js";
import { useState, useEffect } from "react";

export default function MostViewed() {
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

  return (
    dataFetched && (
      <>
        <PageProvider>
          <ProductProvider>
            <FilterProvider>
              <PageContent>
                <Navbar root="mostviewed" />
                <MobileMenu />
                {pageList.map((eachPage) => {
                  if (eachPage.isMainCategory)
                    return (
                      <ProductShortList
                        title={`Most Viewed ${eachPage.title}`}
                        sortBy="viewCount"
                        maincategory={eachPage.shortname}
                        key={eachPage.shortname}
                      />
                    );
                })}
                <ContactUs />
                <Footer />
              </PageContent>
            </FilterProvider>
          </ProductProvider>
        </PageProvider>
      </>
    )
  );
}
