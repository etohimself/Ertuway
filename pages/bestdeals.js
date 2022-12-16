import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import ProductShortList from "../components/ProductShortList";

export default function BestDeals() {
  return (
    <>
      <ProductProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="bestdeals" />
            <ProductShortList
              title="Best Deals Electronics"
              sortBy="salePercentage"
              maincategory="electronics"
            />
            <ProductShortList
              title="Best Deals Fashion"
              sortBy="salePercentage"
              maincategory="fashion"
            />
            <ProductShortList
              title="Best Deals Health & Beauty"
              sortBy="salePercentage"
              maincategory="health"
            />
            <ProductShortList
              title="Best Deals Home & Garden"
              sortBy="salePercentage"
              maincategory="home"
            />
            <ProductShortList
              title="Best Deals Automotive"
              sortBy="salePercentage"
              maincategory="car"
            />
            <ProductShortList
              title="Best Deals Consumables"
              sortBy="salePercentage"
              maincategory="consumable"
            />
            <ProductShortList
              title="Best Deals Supermarket"
              sortBy="salePercentage"
              maincategory="supermarket"
            />
            <ProductShortList
              title="Best Deals Hobby & Art"
              sortBy="salePercentage"
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
