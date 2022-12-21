import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import ProductShortList from "../components/ProductShortList";
import { PageProvider } from "../contexts/pageContext.js";
import MobileMenu from "../components/MobileMenu.js";

export default function BestSellers() {
  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="bestsellers" />
              <MobileMenu />
              <ProductShortList
                title="Best Selling Electronics"
                sortBy="soldCount"
                maincategory="electronics"
              />
              <ProductShortList
                title="Best Selling Fashion"
                sortBy="soldCount"
                maincategory="fashion"
              />
              <ProductShortList
                title="Best Selling Health & Beauty"
                sortBy="soldCount"
                maincategory="health"
              />
              <ProductShortList
                title="Best Selling Home & Garden"
                sortBy="soldCount"
                maincategory="home"
              />
              <ProductShortList
                title="Best Selling Automotive"
                sortBy="soldCount"
                maincategory="car"
              />
              <ProductShortList
                title="Best Selling Consumables"
                sortBy="soldCount"
                maincategory="consumable"
              />
              <ProductShortList
                title="Best Selling Supermarket"
                sortBy="soldCount"
                maincategory="supermarket"
              />
              <ProductShortList
                title="Best Selling Hobby & Art"
                sortBy="soldCount"
                maincategory="hobby"
              />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
        </ProductProvider>
      </PageProvider>
    </>
  );
}
