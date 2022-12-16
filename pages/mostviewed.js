import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import ProductShortList from "../components/ProductShortList";

export default function MostViewed() {
  return (
    <>
      <ProductProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="bestsellers" />
            <ProductShortList
              title="Most Viewed Electronics"
              sortBy="viewCount"
              maincategory="electronics"
            />
            <ProductShortList
              title="Most Viewed Fashion"
              sortBy="viewCount"
              maincategory="fashion"
            />
            <ProductShortList
              title="Most Viewed Health & Beauty"
              sortBy="viewCount"
              maincategory="health"
            />
            <ProductShortList
              title="Most Viewed Home & Garden"
              sortBy="viewCount"
              maincategory="home"
            />
            <ProductShortList
              title="Most Viewed Automotive"
              sortBy="viewCount"
              maincategory="car"
            />
            <ProductShortList
              title="Most Viewed Consumables"
              sortBy="viewCount"
              maincategory="consumable"
            />
            <ProductShortList
              title="Most Viewed Supermarket"
              sortBy="viewCount"
              maincategory="supermarket"
            />
            <ProductShortList
              title="Most Viewed Hobby & Art"
              sortBy="viewCount"
              maincategory="hobby"
            />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </ProductProvider>
    </>
  );
}
