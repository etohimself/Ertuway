import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import Welcomer from "../components/Welcomer.js";
import DiscountCategories from "../components/DiscountCategories.js";
import { ProductProvider } from "../contexts/productContext";
import ProductShortList from "../components/ProductShortList.js";
import ExploreCategories from "../components/ExploreCategories.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { PageProvider } from "../contexts/pageContext.js";

export default function Home() {
  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="" />
              <MobileMenu />
              <Welcomer />
              <DiscountCategories
                title="Save Up to %30 on Gifts for Your Mom"
                event="momsday"
              />
              <DiscountCategories
                title="Saturday Electronics Sale, Up to %25 on Limited Items"
                event="saturdaysale"
              />

              <ProductShortList
                title="Best Deals Products"
                sortBy="salePercentage"
              />
              <ProductShortList
                title="Most Viewed Products"
                sortBy="viewCount"
              />
              <ProductShortList title="Most Sold Products" sortBy="soldCount" />

              <ExploreCategories />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
        </ProductProvider>
      </PageProvider>
    </>
  );
}
